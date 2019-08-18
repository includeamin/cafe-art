from flask import Blueprint, request

from Classes.User import User
from Classes.Tools import Tools
from Middleware.Middlewares import json_body_required, login_required, check_form_json_key

user_route = Blueprint("user_route", __name__, "template")


@user_route.route('/user/enter', methods=['POST'])
@json_body_required
@check_form_json_key(['PhoneNumber'])
def enter_app():
    try:
        data = request.get_json()
        return User.enter_app(data['PhoneNumber'])
    except Exception as ex:
        return Tools.Result(False, ex.args)


@user_route.route('/user/sign_up/complete', methods=['POST'])
@json_body_required
@check_form_json_key(['PhoneNumber', 'FirstName', 'LastName', 'BirthDate', 'Gender'])
def complete_sign_up():
    try:
        data = request.get_json()
        return User.complete_sign_up(data['PhoneNumber'],
                                     data['FirstName'],
                                     data['LastName'],
                                     data['BirthDate'],
                                     data['Gender']
                                     )
    except Exception as ex:
        return Tools.Result(False, ex.args)


@user_route.route('/user/login_verification', methods=['POST'])
@json_body_required
@check_form_json_key(['PhoneNumber', 'VerificationCode'])
def login_verification():
    try:
        data = request.get_json()
        return User.login_verification(data['PhoneNumber'], data['VerificationCode'])
    except Exception as ex:
        return Tools.Result(False, ex.args)


@user_route.route('/user/logout', methods=['POST'])
def logout():
    try:
        return User.logout(request.headers['Id'],
                           request.headers['Token']
        )
    except Exception as ex:
        return Tools.Result(False, ex.args)


@user_route.route('/user/code/resend', methods=['POST'])
@json_body_required
@check_form_json_key(['PhoneNumber'])
def resend_activation_code_to_phone_number():
    try:
        data = request.get_json()
        return User.resend_activation_code_to_phone_number(data['PhoneNumber'])
    except Exception as ex:
        return Tools.Result(False, ex.args)
