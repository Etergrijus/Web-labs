from flask import request

try:
    from Backend.Controllers.Controller import Controller
except ImportError as e:
    from Controllers.Controller import Controller

try:
    from Backend.Services.AuthService import *
except ImportError as e:
    from Services.AuthService import *


class AuthController(Controller):
    def __init__(self):
        super(AuthController, self).__init__()

    @staticmethod
    def register():
        data = request.get_json()
        error = AuthController._validate(data)
        if error:
            return error

        username = data.get('username')
        password = data.get('password')
        char_name = data.get('char_name')
        return AuthService.register(username, password, char_name)

    @staticmethod
    def login():
        data = request.get_json()
        error = AuthController._validate(data)
        if error:
            return error

        username = data.get('username')
        password = data.get('password')
        return AuthService.login(username, password)
