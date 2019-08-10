from flask import Blueprint, request

from Classes.Admin import Admin
from Classes.Tools import Tools
from Middleware.Middlewares import json_body_required, login_required, check_form_json_key

admin_route = Blueprint("admin_route", __name__, "template")


@admin_route.route('/admin/login', methods=['POST'])
@json_body_required
@check_form_json_key(['UserName', 'Password'])
def login():
    try:
        data = request.get_json()
        return Admin.login(data['UserName'],
                           data['Password'])
    except Exception as ex:
        return Tools.Result(False, ex.args)


@admin_route.route('/admin/logout', methods=['POST'])
def logout():
    try:
        return Admin.logout(request.headers['Id'],
                            request.headers['Token'])
    except Exception as ex:
        return Tools.Result(False, ex.args)


@admin_route.route('/admin/info/update', methods=['POST'])
@login_required
@json_body_required
def update_info():
    try:
        data = request.get_json()
        return Admin.update_info(request.headers['Id'],
                                 data['Username'] if 'Username' in data else None,
                                 data['FirstName'] if 'FirstName' in data else None,
                                 data['LastName'] if 'LastName' in data else None)
    except Exception as ex:
        return Tools.Result(False, ex.args)


@admin_route.route('/admin/pass/reset', methods=['POST'])
@login_required
@json_body_required
@check_form_json_key(['PrevPassword', 'NewPassword'])
def reset_password():
    try:
        data = request.get_json()
        return Admin.reset_password(request.headers['Id'],
                                    data['PrevPassword'],
                                    data['NewPassword'])
    except Exception as ex:
        return Tools.Result(False, ex.args)
