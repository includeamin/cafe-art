from Classes.Tools import Tools
from Database.DB import category_collection

from datetime import datetime
from bson import ObjectId


class Category:

    def __init__(self, row_id, title, icon_url, image_url, created_at):
        self.RowId = row_id
        self.Title = title
        self.IconUrl = {
            'IconImage': icon_url,
            'IconId': str(ObjectId())
        }
        self.ImageUrl = {
            'ImageUrl': image_url,
            'ImageId': str(ObjectId())
        }
        self.Created_at = created_at

    @staticmethod
    def get_categories():
        categories_object = category_collection.find({}).sort('RowId', 1)

        categories = []
        for category in categories_object:
            
            # pop images
            category['IconUrl'].pop('IconImage')
            icon_id = category['IconUrl'].pop('IconId')
            category.pop('IconUrl')
            category['IconUrl'] = 'https://cafe-art-backend.liara.run/category/icon/{}'.format(icon_id)

            category['ImageUrl'].pop('ImageUrl')
            image_id = category['ImageUrl'].pop('ImageId')
            category.pop('ImageUrl')
            category['ImageUrl'] = 'https://cafe-art-backend.liara.run/category/image/{}'.format(image_id)
            
            categories.append(category)

        return Tools.Result(True, Tools.dumps(categories))

    @staticmethod
    def get_category_icon(icon_id):
        category_object = category_collection.find_one({'IconUrl.IconId': icon_id}, {'IconUrl': 1})

        if category_object is None:
            return Tools.Result(False, Tools.errors('INF'))

        return category_object['IconUrl']['IconImage']

    @staticmethod
    def get_category_image(image_id):
        category_object = category_collection.find_one(
            {'ImageUrl.ImageId': image_id}, {'ImageUrl': 1})

        if category_object is None:
            return Tools.Result(False, Tools.errors('INF'))

        return category_object['ImageUrl']['ImageUrl']



    @staticmethod
    def _get_categories():
        categories_object = category_collection.find({}, {'RowId': 1, 'Title': 1})

        categories = []
        for category in categories_object:
            categories.append(category)
        
        return categories

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
