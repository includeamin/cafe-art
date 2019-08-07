from Database.DB import item_collection
from Classes.Tools import Tools
from bson import ObjectId
from datetime import datetime
from operator import itemgetter


class Item:

    def __init__(self, row_id, category_name, title, price, menu_image_url, item_image_url, gallery):
        self.RowId = row_id
        self.CategoryName = category_name
        self.Title = title
        self.MenuImageUrl = menu_image_url
        self.ItemImageUrl = item_image_url
        self.LikesCount = 0
        self.Likes = []
        self.Comments = []
        self.Gallery = gallery
        self.price = price

    @staticmethod
    def add_item(row_id, category_name, title, price, menu_image_url, item_image_url, gallery):

        gallery_objects = []
        for item in gallery:
            gallery_objects.append({
                'ImageUrl': item,
                'Likes': [],
                'LikesCount': 0,
                'Id': ObjectId()
            })

        result = item_collection.insert_one(Item(
            row_id, category_name, title, price, menu_image_url, item_image_url, gallery_objects).__dict__)

        return Tools.Result(True, Tools.dumps({
            '_id': result.inserted_id,
            'name': title
        }))

    @staticmethod
    def modify_item(item_id, row_id=None, category_name=None, title=None, price=None, menu_image_url=None, item_image_url=None):

        # make sure at least on attribute is not null
        if row_id is None and category_name is None and title is None and price is None and menu_image_url is None and item_image_url is None:
            return Tools.Result(False, Tools.errors('NA'))

        if (row_id is None and category_name is not None) or (row_id is not None and category_name is None):
            return Tools.Result(False, Tools.errors('NA'))

        valid = item_collection.find_one(
            {'_id': ObjectId(item_id)}, {'_id': 1}) is not None

        if not valid:
            return Tools.Result(False, Tools.errors('INF'))

        updating_values = {}
        if title is not None:
            updating_values['Title'] = title
        if row_id is not None:
            updating_values['RowId'] = row_id
            updating_values['CategoryName'] = category_name
        if price is not None:
            updating_values['Price'] = price
        if menu_image_url is not None:
            updating_values['MenuImageUrl'] = menu_image_url
        if item_image_url is not None:
            updating_values['ItemImageUrl'] = item_image_url

        item_collection.update_one(
            {'_id': ObjectId(item_id)},
            {
                '$set': {**updating_values}
            }
        )

        return Tools.Result(True, 'd')

    @staticmethod
    def delete_item(item_id):
        valid = item_collection.find_one(
            {'_id': ObjectId(item_id)}) is not None

        if not valid:
            return Tools.Result(False, Tools.errors('INF'))

        item_collection.delete_one({'_id': ObjectId(item_id)})

        return Tools.Result(True, 'd')

    @staticmethod
    def add_image_gallery(item_id, gallery):

        gallery_objects = []
        for item in gallery:
            gallery_objects.append({
                'ImageUrl': item,
                'Likes': [],
                'LikesCount': 0,
                'Id': ObjectId()
            })

        item_collection.update_one(
            {'_id': ObjectId(item_id)},
            {
                '$push': {
                    'Gallery': {
                        '$each': gallery_objects
                    }
                }
            }
        )

        return Tools.Result(True, 'd')

    @staticmethod
    def delete_image_from_gallery(item_id, gallery_image_id):
        item = item_collection.find_one({'_id': ObjectId(item_id)}, {'_id': 1})

        if item is None:
            return Tools.Result(False, Tools.errors('INF'))

        item_collection.update_one(
            {'_id': ObjectId(item_id)},
            {
                '$pull': {
                    'Gallery': {'Id': ObjectId(gallery_image_id)}
                }
            }
        )

        return Tools.Result(True, 'd')

    @staticmethod
    def get_gallery_images(item_id):
        item = item_collection.find_one(
            {'_id': ObjectId(item_id)}, {'Gallery': 1})

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
    def get_all_items():
        items_object = item_collection.find({})

        items = []
        for item in items_object:
            items.append(item)

        if len(items) == 0:
            return Tools.Result(False, Tools.errors('INF'))

        return Tools.Result(True, Tools.dumps(items))

    @staticmethod
    def like_item(item_id, user_id):

        valid = item_collection.find_one(
            {'_id': ObjectId(item_id)}) is not None

        if not valid:
            return Tools.Result(False, Tools.errors('INF'))

        # make sure user did not liked the item before
        liked_before = item_collection.find_one(
            {'_id': ObjectId(item_id), 'Likes.UserId': user_id}) is not None

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
    def unlike_item(item_id, user_id):
        valid = item_collection.find_one(
            {'_id': ObjectId(item_id)}) is not None

        if not valid:
            return Tools.Result(False, Tools.errors('INF'))

        # make sure user did not liked the item before
        liked_before = item_collection.find_one(
            {'_id': ObjectId(item_id), 'Likes.UserId': user_id}) is not None

        if not liked_before:
            return Tools.Result(False, Tools.errors('INF'))

        # update the likes
        item_collection.update_one(
            {'_id': ObjectId(item_id)},
            {
                '$pull': {'Likes': {'UserId': user_id}},
                '$inc': {'LikesCount': -1}
            }
        )

        return Tools.Result(True, 'd')

    @staticmethod
    def comment_on_item(item_id, user_id, comment, rate):

        valid = item_collection.find_one(
            {'_id': ObjectId(item_id)}) is not None

        if not valid:
            return Tools.Result(False, Tools.errors('INF'))

        # # make sure user did not comment on the item before
        # commented_before = item_collection.find_one({'_id': ObjectId(item_id), 'Comments.UserId': user_id}) is not None

        # if commented_before:
        #     return Tools.Result(False, Tools.errors('IAE'))

        # update the comments
        item_collection.update_one(
            {'_id': ObjectId(item_id)},
            {
                '$push': {
                    'Comments': {
                        'CommentId': ObjectId(),
                        'UserId': user_id,
                        'Comment': comment,
                        'Rate': rate,
                        'Seen': False,
                        'Created_at': datetime.now()
                    }
                }
            }
        )

        return Tools.Result(True, 'd')

    @staticmethod
    def get_comments_on_item(item_id):
        item_object = item_collection.find_one(
            {'_id': ObjectId(item_id)}, {'Comments': 1})

        if item_object is None:
            return Tools.Result(False, Tools.errors('INF'))

        comments = item_object['Comments']

        return Tools.Result(True, Tools.dumps(comments))

    @staticmethod
    def get_all_comments():
        item_object = item_collection.find({}, {'Comments': 1})

        comments = []
        for item in item_object:
            comments.append(item['Comments'])

        return Tools.Result(True, Tools.dumps(comments))

    @staticmethod
    def admin_saw_comment(comment_id):

        valid = item_collection.find_one(
            {'Comments.CommentId': ObjectId(comment_id)}, {'_id': 1}) is not None

        if not valid:
            return Tools.Result(False, Tools.errors('INF'))

        item_collection.update_one(
            {
                'Comments.CommentId': ObjectId(comment_id)
            },
            {
                '$set': {'Comments.$[elem].Seen': True}
            },
            array_filters=[{'elem.CommentId': ObjectId(comment_id)}]
        )

        return Tools.Result(True, 'd')

    @staticmethod
    def like_image_gallery(item_id, user_id, gallery_image_id):
        valid = item_collection.find_one(
            {'_id': ObjectId(item_id)}) is not None

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

    @staticmethod
    def unlike_image_gallery(item_id, user_id, gallery_image_id):
        valid = item_collection.find_one(
            {'_id': ObjectId(item_id)}) is not None

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

        found = False
        for images in gallery['Gallery']:
            if str(images['Id']) == gallery_image_id:
                for like in images['Likes']:
                    if like['UserId'] == user_id:
                        found = True

        if not found:
            return Tools.Result(False, Tools.errors('NA'))

        # update the likes
        item_collection.update_one(
            {
                '_id': ObjectId(item_id)
            },
            {
                '$dec': {'Gallery.$[elem].LikesCount': -1},
                '$pull': {'Gallery.$[elem].Likes': {'UserId': user_id}}
            },
            array_filters=[{'elem.Id': ObjectId(gallery_image_id)}]
        )

        return Tools.Result(True, 'd')

    @staticmethod
    def get_rate_distribution(item_id):
        item_object = item_collection.find_one(
            {'_id': ObjectId(item_id)}, {'Comments': 1})

        if item_object is None:
            return Tools.Result(False, Tools.errors('INF'))

        comments = item_object['Comments']

        total = len(comments)
        rates = {
            '0': 0,
            '1': 0,
            '2': 0,
            '3': 0,
            '4': 0,
            '5': 0,
            '6': 0
        }

        for comment in comments:
            rates[str(comment['Rate'])] += 1

        return Tools.Result(True, Tools.dumps({
            'Total': total,
            'Rates': rates
        }))

    @staticmethod
    def get_average_rate(row_id):
        items = item_collection.find(
            {'RowId': row_id}, {'Comments': 1, 'Title': 1})

        if items is None:
            return Tools.Result(False, Tools.errors('INF'))

        items_arr = []
        for item in items:
            items_arr.append(item)

        items_rate_arr = {}
        for item in items_arr:
            sum_ = 0
            total = len(item['Comments'])
            if total == 0:
                continue
            for comment in item['Comments']:
                sum_ += comment['Rate']
            items_rate_arr[item['Title']] = sum_/total

        return Tools.Result(True, Tools.dumps(items_rate_arr))

    @staticmethod
    def get_top_items():
        items = item_collection.find({}, {'Comments': 1, 'Title': 1, 'ItemImageUrl': 1})

        if items is None:
            return Tools.Result(False, Tools.errors('INF'))

        items_arr = []
        for item in items:
            items_arr.append(item)

        items_rate_arr = []
        for item in items_arr:
            sum_ = 0
            total = len(item['Comments'])
            if total == 0:
                continue
            for comment in item['Comments']:
                sum_ += comment['Rate']
            
            items_arr.append({
                'Title': item['Title'],
                'AverageRate': sum_/total,
                'Image': item['ItemImageUrl']
            })
        
        # sort items based on average rate
        sorted_items = sorted(items_rate_arr, key=itemgetter('AverageRate'), reverse=True)

        upper_bound = min(5, len(items_rate_arr))

        return Tools.Result(True, Tools.dumps(sorted_items[:upper_bound]))
