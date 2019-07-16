from Classes.Tools import Tools
from Database.DB import category_collection


class Category:

    def __init__(self, row_id, title, icon_url, image_url):
        self.RowId = row_id
        self.Title = title
        self.IconUrl = icon_url
        self.ImageUrl = image_url

    @staticmethod
    def get_categories():
        categories_object = category_collection.find({}).sort('RowId', 1)

        categories = []
        for category in categories_object:
            categories.append(category)

        return Tools.Result(True, Tools.dumps(categories))

    @staticmethod
    def init_db(row_id, title, icon_url, image_url):
        category_collection.insert_one(Category(row_id, title, icon_url, image_url).__dict__)

# for i in range(20):
#     Category.init_db(i, 'title' + str(i), 'icon_url_' + str(i), 'image_url_' + str(i))
# print(Category.get_categories())
