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
    url = 'localhost:27017'
    configs = {
        "DatabaseName": "TempUserManagement",
        "UserCollection": "User",
        "PointType": "PointType",
        "Invite": "Invite",
        "Category": "Category",
        "Item": "Item"
    }

mongodb = pymongo.MongoClient(url)
database = mongodb[configs["DatabaseName"]]
UserDb = database[configs["UserCollection"]]
point_collection = database[configs["PointType"]]
invite_collection = database[configs['Invite']]
category_collection = database[configs['Category']]
item_collection = database[configs['Item']]
