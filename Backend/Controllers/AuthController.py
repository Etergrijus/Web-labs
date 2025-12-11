from flask import request

try:
    from Backend.Services.AuthService import *
except ImportError as e:
    from Services.AuthService import *


class AuthController:
    @staticmethod
    def register():
        data = request.get_json()
        error = AuthService.validate(data)
        if error:
            return error

        username = data.get('username')
        password = data.get('password')
        char_name = data.get('char_name')
        return AuthService.register(username, password, char_name)

    @staticmethod
    def login():
        data = request.get_json()
        error = AuthService.validate(data)
        if error:
            return error

        username = data.get('username')
        password = data.get('password')
        return AuthService.login(username, password)
