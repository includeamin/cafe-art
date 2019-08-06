from Classes.Tools import Tools
from Database.DB import category_collection

from datetime import datetime
from bson import ObjectId


class Category:

    def __init__(self, row_id, title, icon_url, image_url, created_at):
        self.RowId = row_id
        self.Title = title
        self.IconUrl = icon_url
        self.ImageUrl = image_url
        self.Created_at = created_at

    @staticmethod
    def get_categories():
        categories_object = category_collection.find({}).sort('RowId', 1)

        categories = []
        for category in categories_object:
            categories.append(category)

        return Tools.Result(True, Tools.dumps(categories))

    @staticmethod
    def add_category(row_id, title, icon_url, image_url):

        # make sure row id is unique
        is_unique = category_collection.find_one(
            {'RowId': row_id}, {'_id': 1}) is None

        if not is_unique:
            return Tools.Result(False, Tools.errors('IAE'))

        category_collection.insert_one(
            Category(row_id, title, icon_url, image_url, datetime.now()).__dict__)

        return Tools.Result(True, 'd')

    @staticmethod
    def modify_category(category_id, row_id=None, title=None, icon_url=None, image_url=None):

        if row_id is None and title is None and icon_url is None and image_url is None:
            return Tools.Result(False, Tools.errors('NA'))

        valid = category_collection.find_one(
            {'_id': ObjectId(category_id)}, {'_id': 1}) is not None

        if not valid:
            return Tools.Result(False, Tools.errors('INF'))

        updating_values = {}
        if row_id is not None:
            updating_values['RowId'] = row_id
        if title is not None:
            updating_values['Title'] = title
        if icon_url is not None:
            updating_values['IconUrl'] = icon_url
        if image_url is not None:
            updating_values['ImageUrl'] = image_url

        category_collection.update_one(
            {'_id': ObjectId(category_id)},
            {
                '$set': {**updating_values}
            }
        )

        return Tools.Result(True, 'd')

    @staticmethod
    def delete_category(row_id):

        valid = category_collection.find_one(
            {'RowId': row_id}, {'_id': 1}) is not None

        if not valid:
            return Tools.Result(False, Tools.errors('INF'))

        category_collection.delete_one({'RowId': row_id})

        return Tools.Result(True, 'd')
# for i in range(20):
#     Category.init_db(i, 'title' + str(i), 'icon_url_' + str(i), 'image_url_' + str(i))
# print(Category.get_categories())
