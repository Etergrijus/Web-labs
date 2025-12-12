from flask import Flask
from flask_cors import CORS

from Controllers.AuthController import AuthController
from Controllers.ContentController import ContentController
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


@app.route('/character/<int:char_id>', methods=['GET'])
def fetch_data(char_id):
    return ContentController.show_content(char_id)


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)
