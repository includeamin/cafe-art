from flask import Blueprint, request

from Classes.Cafe import Cafe
from Classes.Tools import Tools
from Middleware.Middlewares import json_body_required, login_required, check_form_json_key

cafe_route = Blueprint("cafe_route", __name__, "template")

@cafe_route.route('/admin/cafe/image/add', methods=['POST'])
@login_required
@json_body_required
@check_form_json_key(['Image'])
def add_image():
    try:
        data = request.get_json()
        return Cafe.add_image(data['Image'])
    except Exception as ex:
        return Tools.Result(False, ex.args)


@cafe_route.route('/admin/cafe/image/delete', methods=['POST'])
@login_required
@json_body_required
@check_form_json_key(['ImageId'])
def delete_image():
    try:
        data = request.get_json()
        return Cafe.delete_image(data['ImageId'])
    except Exception as ex:
        return Tools.Result(False, ex.args)


@cafe_route.route('/cafe/images', methods=['GET'])
@login_required
def get_images():
    try:
        return Cafe.get_images()
    except Exception as ex:
        return Tools.Result(False, ex.args)