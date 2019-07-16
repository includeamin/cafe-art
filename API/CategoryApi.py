from flask import Blueprint, request

from Classes.Category import Category
from Classes.Tools import Tools
from Middleware.Middlewares import json_body_required, login_required, check_form_json_key

category_route = Blueprint("category_route", __name__, "template")


@category_route.route('/categories', methods=['GET'])
def get_categories():
    try:
        return Category.get_categories()
    except Exception as ex:
        return Tools.Result(False, ex.args)


@category_route.route('/admin/categories/add', methods=['POST'])
@login_required
@json_body_required
@check_form_json_key(['RowId', 'Title', 'IconUrl', 'ImageUrl'])
def add_category():
    try:
        data = request.get_json()
        return Category.add_category(data['RowId'],
                                     data['Title'],
                                     data['IconUrl'],
                                     data['ImageUrl']
                                     )
    except Exception as ex:
        return Tools.Result(False, ex.args)


@category_route.route('/admin/categories/delete', methods=['POST'])
@login_required
@json_body_required
@check_form_json_key(['RowId'])
def delete_category():
    try:
        data = request.get_json()
        return Category.delete_category(data['RowId'])
    except Exception as ex:
        return Tools.Result(False, ex.args)
