from flask import Flask, jsonify
from flask_cors import CORS

from API.CategoryApi import category_route
from API.ItemApi import item_route
from API.EventApi import event_route
from API.AdminApi import admin_route
from API.NotificationApi import notification_route
from API.UserApi import user_route
from API.CafeApi import cafe_route

app = Flask(__name__)
import os
print(os.environ['SMSKEY'])
app.register_blueprint(category_route)
app.register_blueprint(item_route)
app.register_blueprint(event_route)
app.register_blueprint(admin_route)
app.register_blueprint(notification_route)
app.register_blueprint(user_route)
app.register_blueprint(cafe_route)

CORS(app)


def decorator(arg1, arg2):
    def real_decorator(function):
        def wrapper(*args, **kwargs):
            print("Congratulations.  You decorated a function that does something with %s and %s" % (arg1, arg2))

        return wrapper

    return real_decorator


@app.route("/")
def what():
    print("here")
    return jsonify({"What": "Authentication",
                    "Author": "AminJamal",
                    "NickName": "Includeamin",
                    "Email": "aminjamal10@gmail.com",
                    "WebSite": "includeamin.com"
                   })


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=4002, debug=True)
