from flask import Blueprint, request

from Classes.Notification import Notification
from Classes.Tools import Tools
from Middleware.Middlewares import json_body_required, check_form_json_key, login_required

notification_route = Blueprint("notification_route", __name__, "template")


@notification_route.route('/admin/notification/push', methods=['POST'])
@login_required
@json_body_required
@check_form_json_key(['Title', 'Date', 'Description'])
def push_notification():
    try:
        data = request.get_json()
        return Notification.push_notification(request.headers['Id'],
                                              data['Title'],
                                              data['Date'],
                                              data['Description']
                                              )
    except Exception as ex:
        return Tools.Result(False, ex.args)

@notification_route.route('/admin/notifications', methods=['GET'])
@login_required
def get_notifications():
    try:
        return Notification.get_notifications()
    except Exception as ex:
        return Tools.Result(False, ex.args)


@notification_route.route('/admin/notification/delete', methods=['POST'])
@login_required
@json_body_required
@check_form_json_key(['NotificationId'])
def delete_notification():
    try:
        data = request.get_json()
        return Notification.delete_notification(data['NotificationId'])
    except Exception as ex:
        return Tools.Result(False, ex.args)
