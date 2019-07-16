from flask import Blueprint

from Classes.Category import Category
from Classes.Tools import Tools

category_route = Blueprint("category_route", __name__, "template")


@category_route.route('/categories', methods=['GET'])
def get_categories():
    try:
        return Category.get_categories()
    except Exception as ex:
        return Tools.Result(False, ex.args)
