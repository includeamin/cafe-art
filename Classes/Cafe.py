from Database.DB import cafe_collection
from Classes.Tools import Tools
from bson import ObjectId


class Cafe:

    def __init__(self, images):
        self.Images = []

    @staticmethod
    def add_image(image):
        image_id = str(ObjectId())

        cafe_collection.update_one({},
                                   {
            '$push': {
                'Images': {
                    'ImageId': image_id,
                    'Image': str(image)
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
                    'ImageId': image_id
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


    @staticmethod
    def get_image_urls():
        images = cafe_collection.find_one({}, {'_id': 0})

        image_urls = []
        for image in images['Images']:
            image_urls.append('https://cafe-art-backend.liara.run/cafe/image/{}'.format(image['ImageId']))

        return Tools.Result(True, Tools.dumps(image_urls))

    @staticmethod
    def get_image(image_id):
        images = cafe_collection.find_one({}, {'_id': 0})

        for image in images['Images']:
            if image['ImageId'] == image_id:
                return image['Image']

        return ""
            
