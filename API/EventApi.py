from flask import Blueprint, request

from Middleware.Middlewares import json_body_required, check_form_json_key, login_required
from Classes.Tools import Tools
from Classes.Event import Event

event_route = Blueprint('event_route', __name__, 'template')


@event_route.route('/admin/event/add', methods=['POST'])
@login_required
@json_body_required
@check_form_json_key(['Title', 'ImageUrl', 'Description', 'Date', 'Price', 'Capacity'])
def add_event():
    try:
        data = request.get_json()
        return Event.add_event(data['Title'],
                               data['ImageUrl'],
                               data['Description'],
                               data['Date'],
                               data['Price'],
                               data['Capacity'],
                               )
    except Exception as ex:
        return Tools.Result(False, ex.args)


@event_route.route('/admin/event/remove', methods=['POST'])
@login_required
@json_body_required
@check_form_json_key(['EventId'])
def delete_event():
    try:
        data = request.get_json()
        return Event.delete_event(data['EventId'])
    except Exception as ex:
        return Tools.Result(False, ex.args)


@event_route.route('/admin/event', methods=['GET'])
@login_required
@json_body_required
@check_form_json_key
def get_events():
    try:
        return Event.get_events()
    except Exception as ex:
        return Tools.Result(False, ex.args)
