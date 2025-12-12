from flask import jsonify
from peewee import IntegrityError, DataError

try:
    from Backend.database_conn import db
except ImportError as e:
    from database_conn import db

try:
    from Backend.Repository.UserRepository import *
except ImportError as e:
    from Repository.UserRepository import *

try:
    from Backend.Repository.CharacterRepository import *
except ImportError as e:
    from Repository.CharacterRepository import *


class AuthService:
    @staticmethod
    def validate(data):
        if not data:
            return jsonify({'error': 'No data'}), 400

    @staticmethod
    def register(username, password, char_name):
        if not all([username, password, char_name]):
            return jsonify({'error': 'Missing required fields'}), 400

        if len(password) < 6:
            return jsonify({'error': 'Password too short'}), 400

        try:
            with db.get_database().atomic():
                user = UserRepository.create_user(username, password)

                character = CharacterRepository.create_character(char_name, user)

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

    @staticmethod
    def login(username, password):
        if not all([username, password]):
            return jsonify({'error': 'Missing required fields'}), 400

        user = UserRepository.find_user(username)
        if not user:
            return jsonify({'error': 'User not found'}), 404

        if UserRepository.check_password(user, password):
            return jsonify({'message': 'User authorized successfully',
                            'username': user.username}), 200
        else:
            return jsonify({'error': 'Incorrect Password'}), 401
