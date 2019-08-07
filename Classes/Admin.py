from Database.DB import admin_collection
from Classes.Tools import Tools
from Classes.Bridge import gen_token_authentication
from cryptography.fernet import Fernet
from bson import ObjectId

class Admin:

    def __init__(self):
        self.FirstName = None
        self.LastName = None
        self.UserName = None
        self.Password = None

    @staticmethod
    def login(username, password):
        # make sure admin with specified username exists
        admin_object = admin_collection.find_one({'UserName': username}, {'Password': 1})

        if admin_object is None:
            return Tools.Result(False, Tools.errors('INF'))
        
        fernet = Fernet(admin_object['_id'])

        decrypted_password = fernet.decrypt(admin_object['Password'])

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
    def update_info(admin_id, username=None, firstname=None, lastname=None):

        if username is None and firstname is None and lastname is None:
            return Tools.Result(False, Tools.errors('NA'))

        # make sure admin exists
        exists = admin_collection.find_one({'_id': ObjectId(admin_id)},{'_id': 1}) is not None

        if not exists:
            return Tools.Result(False, Tools.errors('INF'))

        # make sure specified username is unique
        unique = admin_collection.find_one({'_id': ObjectId(admin_id)}, {'_id': 1}) is None

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
        admin_object = admin_collection.find_one({'_id': ObjectId(admin_id)}, {'_id': 1})

        if admin_object is None:
            return Tools.Result(False, Tools.errors('INF'))

        fernet = Fernet(admin_object['_id'])

        decrypted_password = fernet.decrypt(admin_object['Password'])

        if decrypted_password != prev_password:
            return Tools.Result(False, 'NA')

        encrypted_password = fernet.encrypt(new_password)

        admin_collection.update_one(
            {'_id': ObjectId(admin_id)},
            {
                '$set': {
                    'Password': encrypted_password
                }
            }
        )
        
        return Tools.Result(True, 'd')
