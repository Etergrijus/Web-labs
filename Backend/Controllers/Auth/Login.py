from flask import request, jsonify
from peewee import IntegrityError, DataError

try:
    from Backend.Models.models import User, Character
except ImportError as e:
    from Models.models import User, Character
from werkzeug.security import check_password_hash


def login_user():
    data = request.get_json()

    if not data:
        return jsonify({'error': 'No data'}), 400

    username = data.get('username')
    password = data.get('password')

    if not all([username, password]):
        return jsonify({'error': 'Missing required fields'}), 400

    user = User.select().where(User.username == username).first()
    if not user:
        return jsonify({'error': 'User not found'}), 404

    if check_password_hash(user.password, password):
        return jsonify({'message': 'User authorized successfully',
                        'username': user.username}), 200
    else:
        return jsonify({'error': 'Incorrect Password'}), 401
