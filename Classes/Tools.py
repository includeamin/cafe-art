from datetime import datetime
import json

from cryptography.fernet import Fernet
import os


class Tools:
    @staticmethod
    def Result(state, description,error=None,errordata=None):
        return json.dumps({
            "State": state,
            "Description": description
        })

    @staticmethod
    def dumps(data):
        return json.dumps(data, indent=4, sort_keys=True, default=str)

    @staticmethod
    def errors(code):
        errors = {"IAE": 'item already exist',
                  "INF": 'item not found',
                  "ACCD":'Access Denied',
                  "NA":"Not Allowed",
                  "DBNS":"Database must save as a secure service",
                  "UIN":"USER ID NEEDED",
                  "JBR":"Content-Type should equal to application/json",
                  "FTGT":"Faild to generate token",
                  "TINX":"Token and Id not exist"}
        if errors.__contains__(code):
            return errors[code]
        else:
            return "Error code not exist"

    @staticmethod
    def logger(data,type=None):
        pass
    @staticmethod
    def initer(key=None):
        try:
            name = './Database/key.key'
            if key:
                with open(name, 'w') as f:
                    key = str(key[2:-1])
                    f.writelines(key)
                    f.close()
            else:
                with open(name, 'rb') as f:
                    key = f.readline()
                    f.close()
                    return key

        except Exception as ex:
            return False
    @staticmethod
    def decode(input):
        cipher_suite = Fernet(Tools.initer())
        input = str(input)[2:-1]
        input = cipher_suite.decrypt(input.encode())
        input = str(input)[2:-1]
        return input


    @staticmethod
    def combinetwolist(list1, list2):
        one = set(list1)
        two = set(list2)
        return list1 + list(two - one)
    @staticmethod
    def IsValidId(id):
        #resp_content = requests.get(app.config["UserService"] + "/system/users/validid/" + id).content

        #if json.loads(resp_content.decode("utf-8"))["State"]:
        return True
        #else:
         #   return False
    @staticmethod
    def get_all_connected_service_ip()->list:
        pass

