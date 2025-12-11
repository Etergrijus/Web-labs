from flask import request, jsonify
from peewee import IntegrityError, DataError

# for local run
# from Backend.Models.Models import User

# for Docker run
try:
    from Backend.Models.models import User, Character
except ImportError as e:
    from Models.models import User, Character

try:
    from Backend.database_conn import db
except ImportError as e:
    from database_conn import db

from werkzeug.security import generate_password_hash


def register_user():
    data = request.get_json()

    if not data:
        return jsonify({'error': 'No data'}), 400

    username = data.get('username')
    password = data.get('password')
    char_name = data.get('char_name')

    if not all([username, password, char_name]):
        return jsonify({'error': 'Missing required fields'}), 400

    if len(password) < 6:
        return jsonify({'error': 'Password too short'}), 400

    try:
        with db.get_database().atomic():
            user = User.create(
                username=username,
                password=generate_password_hash(password)
            )

            character = Character.create(
                char_name=char_name,
                user=user
            )

            return jsonify({
                'message': 'User registered successfully',
                'user_id': user.id,
                'username': user.username,
                'char_name': character.char_name
            }), 201

    except IntegrityError as e:
        print(str(e))
        return jsonify({'error': 'User already exists'}), 409

    except DataError as e:
        print(str(e))
        if len(str(username)) > 32:
            return jsonify({'error': 'Username too long'}), 400
        elif len(str(char_name)) > 32:
            return jsonify({'error': 'char_name too long'}), 400

    except Exception as e:
        print(str(e))
        return jsonify({'error': 'Internal server error'}), 500
