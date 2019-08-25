import pymongo
import json
import os
import requests
from Classes.Tools import Tools

Decode = Tools.decode
Initer = Tools.initer

dirpath = os.getcwd()

DEBUG = True

if not DEBUG:
    with open(os.path.join(dirpath, "Database/DatabaseConfigs.json")) as f:
        configs = json.load(f)

    get_database_url = json.loads(
        requests.get("{0}/Services/config/get/TempUserManagement".format(configs['MicroServiceManagementURl']),
                     verify=False).content)

    if not get_database_url["State"]:
        exit(1)

    get_database_url = json.loads(get_database_url["Description"])

    url = ''
    if get_database_url["Key"] is None:
        url = Decode(get_database_url["DatabaseString"])
    else:
        Initer(get_database_url["Key"])
        url = Decode(get_database_url["DatabaseString"])
else:
    # url = 'mongodb://root:9ih16LFt1AooBz4YHb5HFcGK@s7.liara.ir:32430'
    url = 'localhost:27017'
    configs = {
        "DatabaseName": "TempUserManagement",
        "UserCollection": "User",
        "Category": "Category",
        "Item": "Item",
        "Event": "Event",
        "Admin": "Admin",
        "Notification": "Notification",
        "Users": "Users",
        "Cafe": "Cafe"
    }

mongodb = pymongo.MongoClient(url)
database = mongodb[configs["DatabaseName"]]
category_collection = database[configs['Category']]
item_collection = database[configs['Item']]
event_collection = database[configs['Event']]
admin_collection = database[configs['Admin']]
notification_collection = database[configs['Notification']]
user_collection = database[configs['Users']]
cafe_collection = database[configs['Cafe']]
