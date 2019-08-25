from Database.DB import cafe_collection
from Classes.Tools import Tools
from bson import ObjectId


class Cafe:

    def __init__(self, images):
        self.Images = []

    @staticmethod
    def add_image(image):
        image_id = ObjectId()

        cafe_collection.update_one({},
                                   {
            '$push': {
                'Images': {
                    'ImageId': image_id,
                    'Image': image
                }
            }
        }
        )

        return Tools.Result(True, 'd')

    @staticmethod
    def delete_image(image_id):
        result = cafe_collection.update_one({}, {
            '$pull': {
                'Images': {
                    'ImageId': ObjectId(image_id)
                }
            }
        })

        if result.modified_count == 0:
            return Tools.Result(False, Tools.errors('INF'))
        else:
            return Tools.Result(True, 'd')


    @staticmethod
    def get_images():
        images = cafe_collection.find_one({}, {'_id': 0})

        return Tools.Result(True, Tools.dumps(images))
