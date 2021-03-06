from Database.DB import item_collection
from Classes.Tools import Tools
from Classes.Category import Category
from bson import ObjectId
from datetime import datetime
from operator import itemgetter


class Item:

    def __init__(self, row_id, category_name, title, description, price, menu_image_url, item_image_url):
        self.RowId = row_id
        self.CategoryName = category_name
        self.Title = title
        self.Description = description
        self.MenuImageUrl = {
            'MenuImage': menu_image_url,
            'MenuImageId': str(ObjectId())
        }
        self.ItemImageUrl = {
            'ItemImage': item_image_url,
            'ItemImageId': str(ObjectId())
        }
        self.LikesCount = 0
        self.Likes = []
        self.Comments = []
        self.Gallery = []
        self.Price = price

    @staticmethod
    def add_item(row_id, category_name, title, description, price, menu_image_url, item_image_url):

        result = item_collection.insert_one(Item(
            str(row_id), category_name, title, description, price, menu_image_url, item_image_url).__dict__)

        return Tools.Result(True, Tools.dumps({
            '_id': result.inserted_id,
            'name': title
        }))

    @staticmethod
    def get_item(item_id):
        item_object = item_collection.find_one({'_id': ObjectId(item_id)}, {
            'RowId': 1,
            'CategoryName': 1,
            'Title': 1,
            'Description': 1,
            'MenuImageUrl': 1,
            'ItemImageUrl': 1,
            'Likes': 1,
            'Price': 1
        })

        if item_object is None:
            return Tools.Result(False, Tools.errors('INF'))

        menu_image_id = item_object['MenuImageUrl']['MenuImageId']
        item_object.pop('MenuImageUrl')
        item_object['MenuImageUrl'] = 'https://cafe-art-backend.liara.run/item/menu/image/{}'.format(
            menu_image_id)

        item_image_id = item_object['ItemImageUrl']['ItemImageId']
        item_object.pop('ItemImageUrl')
        item_object['ItemImageUrl'] = 'https://cafe-art-backend.liara.run/item/item/image/{}'.format(
            item_image_id)

        gallery_images_urls = Item._get_gallery_image_urls(item_id)

        item_object['GalleryUrls'] = gallery_images_urls
        
        return Tools.Result(True, Tools.dumps(item_object))

    @staticmethod
    def get_item_image(image_id):
        item_object = item_collection.find_one(
            {'ItemImageUrl.ItemImageId': image_id}, {'ItemImageUrl': 1})

        if item_object is None:
            return Tools.Result(False, Tools.errors('INF'))

        return item_object['ItemImageUrl']['ItemImage']

    @staticmethod
    def get_item_menu_image(image_id):
        item_object = item_collection.find_one(
            {'MenuImageUrl.MenuImageId': image_id}, {'MenuImageUrl': 1})

        if item_object is None:
            return Tools.Result(False, Tools.errors('INF'))

        return item_object['MenuImageUrl']['MenuImage']

    @staticmethod
    def modify_item(item_id, row_id=None, category_name=None, title=None, description=None, price=None, menu_image_url=None, item_image_url=None):

        # make sure at least on attribute is not null
        if row_id is None and category_name is None and title is None and price is None and menu_image_url is None and item_image_url is None and description is None:
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
            updating_values['RowId'] = str(row_id)
            updating_values['CategoryName'] = category_name
        if price is not None:
            updating_values['Price'] = price
        if menu_image_url is not None:
            updating_values['MenuImageUrl.MenuImage'] = menu_image_url
        if item_image_url is not None:
            updating_values['ItemImageUrl.ItemImage'] = item_image_url
        if description is not None:
            updating_values['Description'] = description

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
                'Id': str(ObjectId())
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
                    'Gallery': {'Id': gallery_image_id}
                }
            }
        )

        return Tools.Result(True, 'd')

    @staticmethod
    def _get_gallery_image_urls(item_id):
        item = item_collection.find_one({'_id': ObjectId(item_id)}, {'Gallery': 1})

        if item is None:
            return Tools.Result(False, Tools.errors('INF'))

        gallery_ids = []
        for gallery in item['Gallery']:
            gallery_ids.append(
                "https://cafe-art-backend.liara.run/item/gallery/{}".format(gallery['Id']))

        return gallery_ids

    @staticmethod
    def _get_gallery_image_urls_for_items(item_objects):

        for item in item_objects:
            gallery_urls = []
            for gallery in item['Gallery']:
                gallery_urls.append("https://cafe-art-backend.liara.run/item/gallery/{}".format(gallery['Id']))

            item['Gallery'] = gallery_urls
        
        return item_objects

    @staticmethod
    def get_gallery_image(gallery_image_id):
        item = item_collection.find_one(
            {'Gallery.Id': gallery_image_id}, {'Gallery': 1})

        if item is None:
            return Tools.Result(False, Tools.errors('INF'))

        response_gallery_image = ""
        for gallery_image in item['Gallery']:
            if gallery_image['Id'] == gallery_image_id:
                response_gallery_image = gallery_image['ImageUrl']

        return response_gallery_image

    @staticmethod
    def get_gallery_images(item_id):
        item = item_collection.find_one(
            {'_id': ObjectId(item_id)}, {'Gallery': 1})

        if item is None:
            return Tools.Result(False, Tools.errors('INF'))

        return Tools.Result(True, Tools.dumps(item['Gallery']))

    @staticmethod
    def get_items(row_id, user_id):

        if str(row_id) != "-1":
            items_object = item_collection.find(
                {'RowId': row_id}, {'Comments': 0, 'CategoryName': 0})
        else:
            items_object = item_collection.find(
                {}, {'Comments': 0, 'CategoryName': 0})

        items = []
        for item in items_object:
            items.append(item)

        if len(items) == 0:
            return Tools.Result(False, Tools.errors('INF'))

        items = Item._get_gallery_image_urls_for_items(items)

        for item in items:
            menu_image_id = item['MenuImageUrl']['MenuImageId']
            item.pop('MenuImageUrl')
            item['MenuImageUrl'] = 'https://cafe-art-backend.liara.run/item/menu/image/{}'.format(
                menu_image_id)

            item_image_id = item['ItemImageUrl']['ItemImageId']
            item.pop('ItemImageUrl')
            item['ItemImageUrl'] = 'https://cafe-art-backend.liara.run/item/item/image/{}'.format(
                item_image_id)

            if len(item['Likes']) == 0:
                item['IsLiked'] = False

            for user_id_ in item['Likes']:
                item['IsLiked'] = True if user_id_['UserId'] == user_id else False

        return Tools.Result(True, Tools.dumps(items))

    @staticmethod
    def get_all_items_by_category():

        categories = Category._get_categories()
        print(categories)

        items_object = item_collection.find(
            {}, {'_id': 0, 'RowId': 1, 'Title': 1})

        items = []
        for item in items_object:
            items.append(item)

        if len(items) == 0:
            return Tools.Result(False, Tools.errors('INF'))

        items_by_category = {}
        for category in categories:
            items_by_category[category['Title']] = []

        for item in items:
            for category in categories:
                if int(item['RowId']) == int(category['RowId']):
                    items_by_category[category['Title']].append(item['Title'])

        return Tools.Result(True, items_by_category)

    @staticmethod
    def get_all_items():
        items_object = item_collection.find({})

        items = []
        for item in items_object:
            items.append(item)

        if len(items) == 0:
            return Tools.Result(False, Tools.errors('INF'))

        items = Item._get_gallery_image_urls_for_items(items)

        for item in items:
            menu_image_id = item['MenuImageUrl']['MenuImageId']
            item.pop('MenuImageUrl')
            item['MenuImageUrl'] = 'https://cafe-art-backend.liara.run/item/menu/image/{}'.format(
                menu_image_id)

            item_image_id = item['ItemImageUrl']['ItemImageId']
            item.pop('ItemImageUrl')
            item['ItemImageUrl'] = 'https://cafe-art-backend.liara.run/item/item/image/{}'.format(
                item_image_id)

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
                sum_ += int(comment['Rate'])
            items_rate_arr[item['Title']] = sum_/total

        return Tools.Result(True, Tools.dumps(items_rate_arr))

    @staticmethod
    def get_top_items():
        items = item_collection.find(
            {}, {'Comments': 1, 'Title': 1, 'ItemImageUrl': 1})

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
                sum_ += int(comment['Rate'])

            items_rate_arr.append({
                'Title': item['Title'],
                'AverageRate': sum_/total,
                'Image': 'https://cafe-art-backend.liara.run/item/item/image/{}'.format(item['ItemImageUrl']['ItemImageId']),
                'Total': total
            })

        # sort items based on average rate
        sorted_items = sorted(items_rate_arr, key=itemgetter(
            'AverageRate'), reverse=True)

        upper_bound = min(5, len(items_rate_arr))

        return Tools.Result(True, Tools.dumps(sorted_items[:upper_bound]))

    @staticmethod
    def comments_seen():
        items = item_collection.find({}, {'Comments': 1})

        if items is None:
            return Tools.Result(False, Tools.errors('INF'))

        items_arr = []
        for item in items:
            items_arr.append(item)

        total = 0
        seen = 0
        for item in items_arr:
            total += len(item['Comments'])
            if total == 0:
                continue
            for comment in item['Comments']:
                seen += 1 if comment['Seen'] is True else 0

        response = {
            'Seen': seen,
            'Total': total
        }

        return Tools.Result(True, Tools.dumps(response))

    @staticmethod
    def get_all_unseen_comments():
        items = item_collection.find({}, {'Comments': 1, 'Title': 1})

        if items is None:
            return Tools.Result(False, 'INF')

        items_arr = []
        for item in items:
            items_arr.append(item)

        unseen_comments = []
        for item in items_arr:
            if len(item['Comments']) == 0:
                continue
            for comment in item['Comments']:
                if not comment['Seen']:
                    comment['Title'] = item['Title']
                    unseen_comments.append(comment)

        return Tools.Result(True, Tools.dumps(unseen_comments))

    @staticmethod
    def get_favorite_items(user_id):

        items_object = item_collection.find({'Likes.UserId': user_id})

        favorite_items = []
        for item in items_object:
            favorite_items.append(item)

        return Tools.Result(True, Tools.dumps(favorite_items))

    @staticmethod
    def _get_favorite_items(user_id):

        items_object = item_collection.find(
            {'Likes.UserId': user_id}, {'ItemImageUrl': 1, 'RowId': 1, 'Title': 1, 'CategoryName': 1})

        favorite_items = []
        for item in items_object:
            item["ItemImageUrl"] = "https://cafe-art-backend.liara.run/item/item/image/{0}".format(
                item['ItemImageUrl']['ItemImageId'])
            favorite_items.append(item)

        return favorite_items

    @staticmethod
    def like_unlike_item(item_id, user_id):
        valid = item_collection.find_one(
            {'_id': ObjectId(item_id)}) is not None

        if not valid:
            return Tools.Result(False, Tools.errors('INF'))

        liked_before = item_collection.find_one(
            {'_id': ObjectId(item_id), 'Likes.UserId': user_id}) is not None

        if liked_before:
            item_collection.update_one(
                {'_id': ObjectId(item_id)},
                {
                    '$pull': {'Likes': {'UserId': user_id}},
                    '$inc': {'LikesCount': -1}
                }
            )
            return Tools.Result(True, 'd')

        # update the likes
        item_collection.update_one(
            {'_id': ObjectId(item_id)},
            {
                '$push': {'Likes': {'UserId': user_id}},
                '$inc': {'LikesCount': 1}
            }
        )

        return Tools.Result(True, 'd')
