from Database.DB import notification_collection
from Classes.Tools import Tools
from bson import ObjectId

class Notification:

    def __init__(self, admin_id, title, date, description):
        self.AdminId = admin_id
        self.Title = title
        self.Date = date
        self.Description = description

    @staticmethod
    def push_notification(admin_id, title, date, description):
        
        notification_collection.insert_one(Notification(
            admin_id,
            title,
            date,
            description
        ).__dict__)

        return Tools.Result(True, 'd')

    @staticmethod
    def get_notifications():

        notification_objects = notification_collection.find({})

        notifications = []
        for notification in notification_objects:
            notifications.append(notification)

        return Tools.Result(True, Tools.dumps(notifications))

    @staticmethod
    def delete_notification(notification_id):

        valid = notification_collection.find_one({'_id': ObjectId(notification_id)}, {'_id': 1}) is not None

        if not valid:
            return Tools.Result(False, Tools.errors('INF'))

        notification_collection.delete_one({'_id': ObjectId(notification_id)})

        return Tools.Result(True, 'd')
