from flask import request

try:
    from Backend.Controllers.Controller import Controller
except ImportError as e:
    from Controllers.Controller import Controller

try:
    from Backend.Services.ArchiveService import *
except ImportError as e:
    from Services.ArchiveService import *


class ArchiveController(Controller):
    def __init__(self):
        super(ArchiveController, self).__init__()

    @staticmethod
    def show_archive(char_id):
        return ArchiveService.show_all(char_id)
