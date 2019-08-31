from Database.DB import event_collection
from Classes.Tools import Tools
from datetime import datetime

from bson import ObjectId
import jdatetime

class Event:

    def __init__(self, title, image_url, description, date, price, capacity):
        self.Description = description
        self.Title = title
        self.Date = date
        self.Price = price
        self.ImageUrl = {
            'ImageId': str(ObjectId()),
            'Image': str(image_url)
        }
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
            event_image_id = event['ImageUrl']['ImageId']
            event['ImageUrl'] = 'https://cafe-art-backend.liara.run/event/image/{}'.format(event_image_id)
            events.append(event)

        return Tools.Result(True, Tools.dumps(events))

    @staticmethod
    def get_event_image(image_id):
        event = event_collection.find_one({'ImageUrl.ImageId': image_id}, {'ImageUrl': 1})

        if event is None:
            return Tools.Result(False, Tools.errors('INF'))

        return event['ImageUrl']['Image']

    @staticmethod
    def delete_event(event_id):

        valid = event_collection.find_one({'_id': ObjectId(event_id)}) is not None

        if not valid:
            return Tools.Result(False, Tools.errors('INF'))

        event_collection.delete_one({'_id': ObjectId(event_id)})

        return Tools.Result(True, 'd')

    @staticmethod
    def get_events_sorted():
        event_object = event_collection.find({})

        events = []
        for event in event_object:
            events.append(event)

        passed_events = []
        upcoming_events = []
        for event in events:

            event_image_id = event['ImageUrl']['ImageId']
            event['ImageUrl'] = 'https://cafe-art-backend.liara.run/event/image/{}'.format(event_image_id)

            event_date = event['Date']
            splitted = event_date.split('/')
            year = int(splitted[0])
            month = int(splitted[1])
            day = int(splitted[2])
            cr_date = jdatetime.date(year, month, day).togregorian()
            if cr_date < datetime.now().date():
                passed_events.append({
                    'sdate': cr_date,
                    'Event': event
                })
            else:
                upcoming_events.append({
                    'sdate': cr_date,
                    'Event': event
                })

        passed_events = sorted(passed_events, key=lambda i: i['sdate'])
        upcoming_events = sorted(upcoming_events, key=lambda i: i['sdate'])

        response = {
            'PassedEvents': passed_events,
            'UpcomingEvents': upcoming_events
        }

        return Tools.Result(True, Tools.dumps(response))

        
            
