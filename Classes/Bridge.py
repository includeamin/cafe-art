import requests
from Classes.Tools import Tools
import json
import logging
import os


Result = Tools.Result
Dumps = Tools.dumps
Error = Tools.errors


def send_authentication_email(email, code):
    try:
        return json.dumps({'State': True})
        # get dynamicurl
        content = requests.post("http://chichiapp.ir:3008/email/authentication/send",
                                data={"Email": email, "Code": code}, verify=False).content
        logging.warning(content)

        content = json.loads(content)
        return content

    except Exception as ex:
        return Result(False, ex.args)


def send_invention_sms(phonenumber, code):
    try:


        key = os.environ['SMSKEY']
        url_2 = f'https://api.kavenegar.com/v1/{key}/verify/lookup.json?receptor={phonenumber}&token={code}&template=cafe-art'
        a = requests.get(url_2)
        print(a)
        # todo : check for failing or not
        return json.dumps({'State': True})
    except Exception as ex:
        return Result(True, ex.args)


def gen_token_authentication(user_id):
    try:
        content = requests.post('{0}/system/users/token/add'.format('http://localhost:3001'),
                                data={"UserId": user_id}, verify=False).content
        logging.warning(content)
        content = json.loads(content)

        if content["State"]:
            # log
            return content["Description"]
        else:
            return False
    except Exception as ex:
        logging.warning(ex.args)
        return False


def is_auth(user_id, token):
    try:
        content = requests.get('{0}users/auth/check/{1}/{2}'.format("http://localhost:3001/",
                                                                     user_id,
                                                                     token), verify=False).content

        content = json.loads(content)

        if content["State"]:
            return True
        else:
            return False
    except Exception as ex:
        logging.warning(ex.args)
        return False


def invalidate_token(user_id, token):
    try:
        content = requests.get('{}system/users/logout/{}/{}'.format("http://localhost:3001/", user_id, token),
                               verify=False).content

        content = json.loads(content)

        if content['State']:
            return True
        else:
            return content['Description']

    except Exception as ex:
        logging.warning(ex.args)
        return False


def send_code_phone_number(phone_number, activation_code):
    return json.dumps({'State': True})
    # send activation code to phone number
    sending_result = requests.get(
        'https://chichiapp.ir:3008/sms/authenticate/send/{}/{}'.format(phone_number, activation_code),
        verify=False)

    # parse result
    result_dict = json.loads(sending_result.text)

    # check whether sending was successful
    successful = result_dict['State']

    if successful:
        return Tools.Result(True, 'd')
    else:
        return Tools.Result(False, Tools.errors('INF'))
