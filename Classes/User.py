import json
import random
import re
import requests
from datetime import datetime
from bson import ObjectId

from Database.DB import user_collection
from Classes.Tools import Tools
from Classes.Bridge import send_authentication_email, gen_token_authentication, send_invention_sms, invalidate_token, \
    send_code_phone_number


class User:
    class Constants:
        valid_status = ['Ban', 'Confirm', 'NotConfirm', 'InProgress']

        name_regex = r'[ا آ ب پ ت ث ج چ ح خ د ذ ر ز س ش ص ض ط ظ ع غ ف ق ک گ ل م ن و ه ی]{3,}'
        phone_regex = r'[0-9]{11}'
        activation_code_regex = r'[0-9]{4}'
        email_regex = r'[a-zA-Z0-9._%-]+@[a-zA-Z-9._%-]+.[a-zA-Z]{2,6}'

    def __init__(self, phone_number, code):
        self.Name = None
        self.PhoneNumber = phone_number

        self.BirthDate = None
        self.Gender = None

        self.Created_at = datetime.now()
        self.Update_at = None

        self.Code = {
            'Code': None if code is None else code,
            'Is_Used': False
        }
        self.IsActive = False


    # validations #
    @staticmethod
    def validate_name(name):
        return re.match(User.Constants.name_regex, name)

    @staticmethod
    def validate_phone(phone):
        return re.match(User.Constants.phone_regex, phone)

    @staticmethod
    def validate_email(email):
        return re.match(User.Constants.email_regex, email)

    @staticmethod
    def validate_activation_code(activation_code):
        return re.match(User.Constants.activation_code_regex, activation_code)

    @staticmethod
    def validate_invitation_code(invitation_code):
        return User.validate_activation_code(str(invitation_code))

    @staticmethod
    def validate_geo(geo):
        if ((geo is not None and ('Lat' in geo) and ('Lang' in geo)
             and isinstance(geo['Lat'], float) and isinstance(geo['Lang'], float))
                or geo is None):
            return True
        else:
            return False

    @staticmethod
    def validate_address(address):
        if ((address is not None and ('City' in address) and ('Street' in address) and
             ('PostalCode' in address)) or address is None):
            return True
        else:
            return False

    # TODO Remove this later
    @staticmethod
    def get_activation_code(phone_number):

        user_object = user_collection.find_one(
            {'PhoneNumber': phone_number}, {'Code': 1})

        if user_object is None:
            return Tools.Result(False, Tools.errors('INF'))

        return Tools.Result(True, user_object['Code']['Code'])

    @staticmethod
    def login_as_guest():
        guest_id = ObjectId()
        token = gen_token_authentication(user_id=str(guest_id))

        if not token:
            return Tools.Result(False, Tools.errors("FTGT"))

        response = {
            'Id': str(guest_id),
            'Token': token
        }

        return Tools.Result(True, Tools.dumps(response))
    
    # required #
    @staticmethod
    def register(phone_number):

        # validate first_name, last_name and phone_number
        if User.validate_phone(phone_number) is None:
            print(phone_number)
            return Tools.Result(False, Tools.errors('NA'))

        # check whether phone number is unique or not
        is_duplicate = user_collection.find_one(
            {'PhoneNumber': phone_number}) is not None

        if is_duplicate:
            return Tools.Result(False, Tools.errors('IAE'))

        # generate activation code
        activation_code = User.generate_activation_code()

        # send activation code to phone number
        activation_result = send_code_phone_number(
            phone_number, activation_code)

        # parse result
        result_dict = json.loads(activation_result)

        # check whether sending sms was successful
        successful = result_dict['State']

        # if it failed -> forward the result
        if not successful:
            return activation_result

        # register the user in database with Not Confirmed status
        user_collection.insert_one(
            User(phone_number, activation_code).__dict__
        )

        # registering was successful
        return Tools.Result(True, 'R')


    @staticmethod
    def complete_sign_up(phone_number, name=None, birthdate=None, gender=None):
        # validate phone number
        if User.validate_phone(phone_number) is None:
            return Tools.Result(False, Tools.errors('NA'))

        # make sure user with specified phone number is registered and confirmed
        user_object = user_collection.find_one({
            'PhoneNumber': phone_number
            # 'Status': 'Confirm'
        }, {
            '_id': 1
        })

        if user_object is None:
            return Tools.Result(False, Tools.errors('INF'))

        user_collection.update_one(
            {'PhoneNumber': phone_number},
            {
                '$set': {
                    'Name': name,
                    'Birthdate': birthdate,
                    'Gender': gender
                }
            }
        )

        return Tools.Result(True, 'd')

    @staticmethod
    def login(phone_number):

        # validate phone number
        if User.validate_phone(phone_number) is None:
            return Tools.Result(False, Tools.errors('NA'))

        # make sure user with specified phone number is registered and confirmed
        user_object = user_collection.find_one({
            'PhoneNumber': phone_number
            # 'Status': 'Confirm'
        }, {
            '_id': 1
        })

        if user_object is None:
            return Tools.Result(False, Tools.errors('INF'))

        # generate activation code
        activation_code = User.generate_activation_code()

        # send activation code to phone number
        activation_result = send_code_phone_number(
            phone_number, activation_code)

        # parse result
        result_dict = json.loads(activation_result)

        # check whether sending sms was successful
        successful = result_dict['State']

        # if it failed -> forward the result
        if not successful:
            return activation_result

        user_collection.update_one(
            {'PhoneNumber': phone_number},
            {
                '$set': {
                    'Code.Code': activation_code,
                    'Code.Is_Used': False
                }
            }
        )

        return Tools.Result(True, 'L')

    @staticmethod
    def enter_app(phone_number):

        # if user does already exist -> login
        user_is_active = user_collection.find_one(
            {'PhoneNumber': phone_number}, {'_id': 1}) is not None

        if user_is_active:
            return User.login(phone_number)
        # else -> sign up
        else:
            return User.register(phone_number)

    @staticmethod
    def login_verification(phone_number, verification_code):
        # validate phone number and activation code
        if (re.match(User.Constants.phone_regex, phone_number) is None or
                re.match(User.Constants.activation_code_regex, str(verification_code)) is None):
            return Tools.Result(False, Tools.errors('NA'))

        # check whether user is registered and is assigned the specified activation code
        # also make sure code is not used before
        user_object = user_collection.find_one({
            'PhoneNumber': phone_number,
            'Code.Code': int(verification_code),
            'Code.Is_Used': False
        }, {
            '_id': 1
        })

        if user_object is None:
            return Tools.Result(False, Tools.errors('INF'))

        # update user status to confirmed
        user_collection.update_one(
            {'PhoneNumber': phone_number},
            {
                '$set': {
                    'Update_at': datetime.now(),
                    'Status': 'Confirm',
                    'Code.Is_Used': True,
                    'IsActive': True
                }
            }
        )

        token = gen_token_authentication(user_id=str(user_object["_id"]))

        if not token:
            return Tools.Result(False, Tools.errors("FTGT"))

        response = {
            'Id': user_object["_id"],
            'Token': token
        }

        return Tools.Result(True, Tools.dumps(response))

    @staticmethod
    def logout(user_id, token):

        # make sure user_id exists in database
        user_object = user_collection.find_one(
            {'_id': ObjectId(user_id)},
            {'_id': 1}
        )

        if user_object is None:
            return Tools.Result(False, Tools.errors('INF'))

        # request to invalidate the token
        result = invalidate_token(user_id, token)

        if result is True:
            return Tools.Result(True, 'd')
        else:
            return Tools.Result(False, result)

    @staticmethod
    def generate_activation_code():
        return random.randint(1000, 9999)

    @staticmethod
    def generate_invitation_code():
        return User.generate_activation_code()

    
    @staticmethod
    def resend_activation_code_to_phone_number(phone_number):
        # validate phone number
        if re.match(User.Constants.phone_regex, phone_number) is None:
            return Tools.Result(False, Tools.errors('NA'))

        # make sure user is registered and in not confirmed status
        valid = user_collection.find_one({
            'PhoneNumber': phone_number
        }, {
            '_id': 1
        }) is not None

        if not valid:
            return Tools.Result(False, Tools.errors('NA'))

        # generate an activation code
        activation_code = User.generate_activation_code()

        # store new generated code
        user_collection.update_one(
            {'PhoneNumber': phone_number},
            {
                '$set': {
                    'Update_at': datetime.now(),
                    'Code.Code': activation_code,
                    'Code.Is_Used': False
                }
            }
        )
        # send code to phone number
        sending_result = send_code_phone_number(phone_number, activation_code)

        return sending_result
