from Classes.Tools import Tools
from Database.DB import auth_collection
from secrets import token_hex
from bson import ObjectId

class Auth:

    def __init__(self, user_id, token):
        self.UserId = user_id
        self.Token = token


    @staticmethod
    def add_token(user_id):

        user_id = str(user_id)

        exists = auth_collection.find_one({'UserId': user_id}) is not None

        token = str(token_hex())
        if exists:
            auth_collection.update_one(
                {'UserId': user_id},
                {
                    '$set': {
                        'Token': token
                    } 
                }
            )
        else:
            auth_collection.insert_one(Auth(user_id, token).__dict__)

        return token

    @staticmethod
    def delete_token(user_id):

        user_id = str(user_id)

        result = auth_collection.delete_one({'UserId': user_id})

        return result.deleted_count > 0

    
    @staticmethod
    def is_auth(user_id, token):

        user_id = str(user_id)
        
        is_auth = auth_collection.find_one(
            {'UserId': user_id, 'Token': token}) is not None

        return is_auth
