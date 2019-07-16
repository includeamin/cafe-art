from flask import Flask, jsonify
from flask_cors import CORS

from API.CategoryApi import category_route

app = Flask(__name__)

app.register_blueprint(category_route)

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
                    "WebSite": "includeamin.com"})


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=4002, debug=True)
