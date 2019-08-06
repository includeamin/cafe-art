from flask import Blueprint, request

from Classes.Item import Item
from Classes.Tools import Tools
from Middleware.Middlewares import json_body_required, check_form_json_key, login_required

item_route = Blueprint("item_route", __name__, "template")


@item_route.route('/items/<row_id>', methods=['GET'])
@login_required
def get_items(row_id):
    try:
        return Item.get_items(row_id)
    except Exception as ex:
        return Tools.Result(False, ex.args)


@item_route.route('/admin/test', methods=['GET'])
@login_required
def test():
    return Tools.Result(True, 'test')


@item_route.route('/admin/items', methods=['GET'])
@login_required
def get_all_items():
    try:
        return Item.get_all_items()
    except Exception as ex:
        return Tools.Result(False, ex.args)


@item_route.route('/admin/item/add', methods=['POST'])
@login_required
@json_body_required
@check_form_json_key(['RowId', 'Title', 'Price', 'MenuImageUrl', 'ItemImageUrl', 'Gallery'])
def add_item():
    try:
        data = request.get_json()
        return Item.add_item(data['RowId'],
                             data['Title'],
                             data['Price'],
                             data['MenuImageUrl'],
                             data['ItemImageUrl'],
                             data['Gallery']
                             )
    except Exception as ex:
        return Tools.Result(False, ex.args)


@item_route.route('/admin/item/modify', methods=['POST'])
@login_required
@json_body_required
@check_form_json_key(['ItemId', 'RowId', 'Title', 'Price', 'MenuImageUrl', 'ItemImageUrl'])
def modify_item():
    try:
        data = request.get_json()
        return Item.modify_item(data['ItemId'],
                                data['RowId'],
                                data['Title'],
                                data['Price'],
                                data['MenuImageUrl'],
                                data['ItemImageUrl']
                                )
    except Exception as ex:
        return Tools.Result(False, ex.args)


@item_route.route('/admin/item/delete', methods=['POST'])
@login_required
@json_body_required
@check_form_json_key(['ItemId'])
def delete_item():
    try:
        data = request.get_json()
        return Item.delete_item(data['ItemId'])
    except Exception as ex:
        return Tools.Result(False, ex.args)


@item_route.route('/admin/item/gallery/image', methods=['POST'])
@login_required
@json_body_required
@check_form_json_key(['ItemId', 'Gallery'])
def add_image_gallery():
    try:
        data = request.get_json()
        return Item.add_image_gallery(data['ItemId'],
                                      data['Gallery'])
    except Exception as ex:
        return Tools.Result(False, ex.args)


@item_route.route('/admin/item/gallery/image/delete', methods=['POST'])
@login_required
@json_body_required
@check_form_json_key(['ItemId', 'GalleryImageId'])
def delete_image_from_gallery():
    try:
        data = request.get_json()
        return Item.delete_image_from_gallery(data['ItemId'],
                                              data['GalleryImageId'])
    except Exception as ex:
        return Tools.Result(False, ex.args)


@item_route.route('/item/gallery/<item_id>', methods=['GET'])
@login_required
def get_gallery_images(item_id):
    try:
        return Item.get_gallery_images(item_id)
    except Exception as ex:
        return Tools.Result(False, ex.args)


@item_route.route('/item/like', methods=['POST'])
@login_required
@json_body_required
@check_form_json_key(['ItemId'])
def like_item():
    try:
        data = request.get_json()
        return Item.like_item(data['ItemId'],
                              request.headers['Id'])
    except Exception as ex:
        return Tools.Result(False, ex.args)


@item_route.route('/item/unlike', methods=['POST'])
@login_required
@json_body_required
@check_form_json_key(['ItemId'])
def unlike_item():
    try:
        data = request.get_json()
        return Item.unlike_item(data['ItemId'],
                                request.headers['Id'])
    except Exception as ex:
        return Tools.Result(False, ex.args)


@item_route.route('/item/gallery/like', methods=['POST'])
@login_required
@json_body_required
@check_form_json_key(['ItemId', 'GalleryImageId'])
def like_image_gallery():
    try:
        data = request.get_json()
        return Item.like_image_gallery(data['ItemId'],
                                       request.headers['Id'],
                                       data['GalleryImageId'])
    except Exception as ex:
        return Tools.Result(False, ex.args)


@item_route.route('/item/gallery/unlike', methods=['POST'])
@login_required
@json_body_required
@check_form_json_key(['ItemId', 'GalleryImageId'])
def unlike_image_gallery():
    try:
        data = request.get_json()
        return Item.unlike_image_gallery(data['ItemId'],
                                         request.headers['Id'],
                                         data['GalleryImageId'])
    except Exception as ex:
        return Tools.Result(False, ex.args)


@item_route.route('/item/comment/submit', methods=['POST'])
@login_required
@json_body_required
@check_form_json_key(['ItemId', 'Comment', 'Rate'])
def comment_on_item():
    try:
        data = request.get_json()
        return Item.comment_on_item(data['ItemId'],
                                    request.headers['Id'],
                                    data['Comment'],
                                    data['Rate'],
                                    )
    except Exception as ex:
        import traceback
        traceback.print_exc()
        return Tools.Result(False, ex.args)


@item_route.route('/admin/item/comments/<item_id>', methods=['GET'])
@login_required
def get_comments_on_item(item_id):
    try:
        return Item.get_comments_on_item(item_id)
    except Exception as ex:
        return Tools.Result(False, ex.args)


@item_route.route('/admin/item/comments', methods=['GET'])
@login_required
def get_all_comments():
    try:
        return Item.get_all_comments()
    except Exception as ex:
        return Tools.Result(False, ex.args)


@item_route.route('/admin/statistics/item/<item_id>')
@login_required
def get_rate_distribution(item_id):
    try:
        return Item.get_rate_distribution(item_id)
    except Exception as ex:
        import traceback
        traceback.print_exc()
        return Tools.Result(False, ex.args)


@item_route.route('/admin/statistics/category/<category_id>')
@login_required
def get_average_rate(category_id):
    try:
        return Item.get_average_rate(category_id)
    except Exception as ex:
        import traceback
        traceback.print_exc()
        return Tools.Result(False, ex.args)


@item_route.route('/admin/comment/seen', methods=['POST'])
@login_required
@json_body_required
@check_form_json_key(['CommentId'])
def admin_saw_comment():
    try:
        data = request.get_json()
        return Item.admin_saw_comment(data['CommentId'])
    except Exception as ex:
        return Tools.Result(False, ex.args)
