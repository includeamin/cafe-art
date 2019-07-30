from Database.DB import event_collection
from Classes.Tools import Tools

from bson import ObjectId


class Event:

    def __init__(self, title, image_url, description, date, price, capacity):
        self.Description = description
        self.Title = title
        self.Date = date
        self.Price = price
        self.ImageUrl = image_url
        self.Capacity = capacity

    @staticmethod
    def add_event(title, image_url, description, date, price, capacity):
        event_collection.insert_one(Event(title, image_url, description, date, price, capacity).__dict__)

        return Tools.Result(True, 'd')

    @staticmethod
    def get_events():
        event_object = event_collection.find({})

        events = []
        for event in event_object:
            events.append(event)

        return Tools.Result(True, Tools.dumps(events))

    @staticmethod
    def delete_event(event_id):

        valid = event_collection.find_one({'_id': ObjectId(event_id)}) is not None

        if not valid:
            return Tools.Result(False, Tools.errors('INF'))

        event_collection.delete_one({'_id': ObjectId(event_id)})

        return Tools.Result(True, 'd')
