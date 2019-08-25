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
        import traceback
        traceback.print_exc()
        return Tools.Result(False, ex.args)

@user_route.route('/user/code/<phone_number>', methods=['GET'])
def get_activation_code(phone_number):
    try:
        return User.get_activation_code(phone_number)
    except Exception as ex:
        return Tools.Result(False, ex.args)


@user_route.route('/user/login/guest', methods=['GET'])
def login_as_guest():
    try:
        return User.login_as_guest()
    except Exception as ex:
        return Tools.Result(False, ex.args)

@user_route.route('/user/sign_up/complete', methods=['POST'])
@json_body_required
@check_form_json_key(['PhoneNumber', 'Name', 'BirthDate', 'Gender'])
def complete_sign_up():
    try:
        data = request.get_json()
        return User.complete_sign_up(data['PhoneNumber'],
                                     data['Name'],
                                     data['BirthDate'],
                                     data['Gender']
                                     )
    except Exception as ex:
        import traceback
        traceback.print_exc()
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


@user_route.route('/user/profile', methods=['GET'])
@login_required
def get_profile_info():
    try:
        return User.get_profile_info(request.headers['Id'])
    except Exception as ex:
        return Tools.Result(False, ex.args)