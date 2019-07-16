from Classes.Category import Category
from flask import Blueprint, request
from Middleware.Middlewares import json_body_required, login_required, check_form_json_key
from Classes.User import User
from Classes.Tools import Tools

category_route = Blueprint("category_route", __name__, "template")


@category_route.route('/categories', methods=['GET'])
def get_categories():
    try:
        return Category.get_categories()
    except Exception as ex:
        return Tools.Result(False, ex.args)
