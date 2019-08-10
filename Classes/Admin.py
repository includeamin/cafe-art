from Database.DB import admin_collection
from Classes.Tools import Tools
from Classes.Bridge import gen_token_authentication, invalidate_token
from cryptography.fernet import Fernet
from bson import ObjectId


class Admin:

    def __init__(self):
        self.FirstName = None
        self.LastName = None
        self.UserName = None
        self.Password = None
        self.Key = None

    @staticmethod
    def register_admin():

        firstname = 'admin'
        lastname = 'admin'
        username = 'admin'
        password = 'admin'

        key = Fernet.generate_key()
        fernet = Fernet(key)

        admin_collection.insert_one({
            'UserName': username,
            'Password': fernet.encrypt(password.encode()),
            'FirstName': firstname,
            'LastName': lastname,
            'Key': key
        })

        return True

    @staticmethod
    def login(username, password):
        # make sure admin with specified username exists
        admin_object = admin_collection.find_one(
            {'UserName': username}, {'Password': 1, 'Key': 1})

        if admin_object is None:
            return Tools.Result(False, Tools.errors('INF'))

        hash_key = str(admin_object['Key'])[2:-1]

        encrypted_password = str(admin_object['Password'])[2:-1].encode()

        cipher_suite = Fernet(hash_key)

        decrypted_password = str(
            cipher_suite.decrypt(encrypted_password))[2:-1]

        if decrypted_password != password:
            return Tools.Result(False, 'NA')

        token = gen_token_authentication(admin_object['_id'])

        if token is False:
            return Tools.Result(False, Tools.errors("FTGT"))

        response = {
            'Id': admin_object['_id'],
            'Token': token
        }

        return Tools.Result(True, Tools.dumps(response))

    @staticmethod
    def logout(admin_id, token):

        # make sure admin id exists in database
        admin_object = admin_collection.find_one(
            {'_id': ObjectId(admin_id)},
            {'_id': 1}
        )

        if admin_object is None:
            return Tools.Result(False, Tools.errors('INF'))

        # request to invalidate the token
        result = invalidate_token(admin_id, token)

        if result is True:
            return Tools.Result(True, 'd')
        else:
            return Tools.Result(False, result)

    @staticmethod
    def update_info(admin_id, username=None, firstname=None, lastname=None):

        if username is None and firstname is None and lastname is None:
            return Tools.Result(False, Tools.errors('NA'))

        # make sure admin exists
        exists = admin_collection.find_one(
            {'_id': ObjectId(admin_id)}, {'_id': 1}) is not None

        if not exists:
            return Tools.Result(False, Tools.errors('INF'))

        # make sure specified username is unique
        unique = admin_collection.find_one(
            {'_id': ObjectId(admin_id)}, {'_id': 1}) is None

        if not unique:
            return Tools.Result(False, Tools.errors('NA'))

        updated_values = {}
        if username is not None:
            updated_values['Username'] = username
        if firstname is not None:
            updated_values['FirstName'] = firstname
        if lastname is not None:
            updated_values['LastName'] = lastname

        admin_collection.update_one(
            {'_id': ObjectId(admin_id)},
            {
                '$set': {**updated_values}
            }
        )

        return Tools.Result(True, 'd')

    @staticmethod
    def reset_password(admin_id, prev_password, new_password):

        # make sure admin exists
        admin_object = admin_collection.find_one(
            {'_id': ObjectId(admin_id)}, {'_id': 1})

        if admin_object is None:
            return Tools.Result(False, Tools.errors('INF'))

        hash_key = str(admin_object['Key'])[2:-1]


        encrypted_password = str(admin_object['Password'])[2:-1].encode()

        cipher_suite = Fernet(hash_key)

        decrypted_password = str(cipher_suite.decrypt(encrypted_password))[2:-1]

        if decrypted_password != prev_password:
            return Tools.Result(False, 'NA')

        encrypted_password = cipher_suite.encrypt(new_password)

        admin_collection.update_one(
            {'_id': ObjectId(admin_id)},
            {
                '$set': {
                    'Password': encrypted_password
                }
            }
        )
        
        return Tools.Result(True, 'd')
