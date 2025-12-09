from flask import Flask
from flask_cors import CORS

from Auth.Register import register_user
from config import config

app = Flask(__name__)
app.secret_key = config.API_KEY

CORS(app)


@app.route('/')
def hello():
    return "Hello from Flask Backend!"


@app.route('/register', methods=['POST'])
def register_endpoint():
    return register_user()


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)
