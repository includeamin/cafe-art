from Database.DB import item_collection
from Classes.Tools import Tools
from bson import ObjectId


class Item:

    def __init__(self, row_id, title, menu_image_url, item_image_url, likes_count: int, likes: list, gallery):
        self.RowId = row_id
        self.Title = title
        self.MenuImageUrl = menu_image_url
        self.ItemImageUrl = item_image_url
        self.LikesCount = likes_count
        self.Likes = [*likes]
        self.Gallery = [*gallery]

    @staticmethod
    def get_items(row_id):
        item = item_collection.find({'RowId': row_id})

        if item is None:
            return Tools.Result(False, Tools.errors('INF'))

        return Tools.Result(True, Tools.dumps(item))

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
                '$push': {'Likes': user_id},
                '$inc': {'LikesCount': 1}
            }
        )

        return Tools.Result(True, 'd')

    @staticmethod
    def like_image_gallery(item_id, user_id, gallery_image_id):
        valid = item_collection.find_one({'_id': ObjectId(item_id)}) is not None

        if not valid:
            return Tools.Result(False, Tools.errors('INF'))

        liked_before = item_collection.find_one(
            {
                '_id': ObjectId(item_id),
                'Gallery': {
                    '$elemMatch': {
                        'Id': gallery_image_id
                    }
                },
                'Gallery.Likes': {
                    '$elemMatch': [user_id]
                }
            },
            {'_id': 1}
        )

        if not liked_before:
            return Tools.Result(False, Tools.errors('NA'))

        # update the likes
        item_collection.update_one(
            {
                '_id': ObjectId(user_id)
            },
            {
                '$inc': {'Gallery.$[elem].LikesCount': 1},
                '$push': {'Gallery.$[elem].Likes': user_id}
            },
            array_filters=[{'elem.Id': gallery_image_id}]
        )

        return Tools.Result(True, 'd')
