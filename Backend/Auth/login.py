from flask import request, jsonify
from peewee import IntegrityError, DataError

from models.models import User
from werkzeug.security import check_password_hash


def login_user():
    data = request.get_json()

    if not data:
        return jsonify({'error': 'No data'}), 400

    username = data.get('username')
    password = data.get('password')