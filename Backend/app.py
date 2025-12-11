from flask import Flask
from flask_cors import CORS

from Controllers.Auth.Register import register_user
from Controllers.Auth.Login import login_user
from Controllers.AuthController import AuthController
from config import config

app = Flask(__name__)
app.secret_key = config.API_KEY

CORS(app)


@app.route('/')
def hello():
    return "Hello from Flask Backend!"


@app.route('/register', methods=['POST'])
def register_endpoint():
    return AuthController.register()


@app.route('/login', methods=['POST'])
def login_endpoint():
    return AuthController.login()


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)
