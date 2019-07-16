from Database.DB import item_collection
from Classes.Tools import Tools
from bson import ObjectId


class Item:

    def __init__(self, row_id, title, menu_image_url, item_image_url):
        self.RowId = row_id
        self.Title = title
        self.MenuImageUrl = menu_image_url
        self.ItemImageUrl = item_image_url
        self.LikesCount = 0
        self.Likes = []
        self.Gallery = []

    @staticmethod
    def add_item(row_id, title, menu_image_url, item_image_url):

        item_collection.insert_one(Item(row_id, title, menu_image_url, item_image_url).__dict__)

    @staticmethod
    def add_image_gallery(item_id, image_url):

        item_collection.update_one(
            {'_id': ObjectId(item_id)},
            {
                '$push': {
                    'Gallery': {
                        'ImageUrl': image_url,
                        'Likes': [],
                        'LikesCount': 0,
                        'Id': ObjectId()
                    }
                }
            }
        )

        return Tools.Result(True, 'd')

    @staticmethod
    def get_gallery_images(item_id):
        item = item_collection.find_one({'_id': ObjectId(item_id)}, {'Gallery': 1})

        if item is None:
            return Tools.Result(False, Tools.errors('INF'))

        return Tools.Result(True, Tools.dumps(item['Gallery']))

    @staticmethod
    def get_items(row_id):
        items_object = item_collection.find({'RowId': row_id})

        items = []
        for item in items_object:
            items.append(item)

        if len(items) == 0:
            return Tools.Result(False, Tools.errors('INF'))

        return Tools.Result(True, Tools.dumps(items))

    @staticmethod
    def like_item(item_id, user_id):

        valid = item_collection.find_one({'_id': ObjectId(item_id)}) is not None

        if not valid:
            return Tools.Result(False, Tools.errors('INF'))

        # make sure user did not liked the item before
        liked_before = item_collection.find_one({'_id': ObjectId(item_id), 'Likes.UserId': user_id}) is not None

        if liked_before:
            return Tools.Result(False, Tools.errors('IAE'))

        # update the likes
        item_collection.update_one(
            {'_id': ObjectId(item_id)},
            {
                '$push': {'Likes': {'UserId': user_id}},
                '$inc': {'LikesCount': 1}
            }
        )

        return Tools.Result(True, 'd')

    @staticmethod
    def like_image_gallery(item_id, user_id, gallery_image_id):
        valid = item_collection.find_one({'_id': ObjectId(item_id)}) is not None

        if not valid:
            return Tools.Result(False, Tools.errors('INF'))

        gallery = item_collection.find_one(
            {
                '_id': ObjectId(item_id),
                'Gallery': {
                    '$elemMatch': {
                        'Id': ObjectId(gallery_image_id)
                    }
                }
            },
            {'_id': 0, 'Gallery': 1}
        )

        for images in gallery['Gallery']:
            if str(images['Id']) == gallery_image_id:
                for like in images['Likes']:
                    if like['UserId'] == user_id:
                        return Tools.Result(False, Tools.errors('IAE'))

        # update the likes
        item_collection.update_one(
            {
                '_id': ObjectId(item_id)
            },
            {
                '$inc': {'Gallery.$[elem].LikesCount': 1},
                '$push': {'Gallery.$[elem].Likes': {'UserId': user_id}}
            },
            array_filters=[{'elem.Id': ObjectId(gallery_image_id)}]
        )

        return Tools.Result(True, 'd')


# for i in range(20):
#     Item.add_item(i, 'item_' + str(i), 'image_url_' + str(i), 'menu_image_url_' + str(i))
# print(Item.get_items(22))
# print(Item.like_item('5d2da0b7d74b103f12d75ddd', 'user1'))
# print(Item.add_image_gallery('5d2da0b7d74b103f12d75ddd', 'gallery_image_2'))
# print(Item.like_image_gallery('5d2da0b7d74b103f12d75ddd', 'user3', '5d2dab88ee45a03b1372040d'))
# print(Item.get_gallery_images('5d2da0b7d74b103f12d75ddd'))
