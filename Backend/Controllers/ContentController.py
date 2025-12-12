from flask import request

try:
    from Backend.Services.ContentService import *
except ImportError as e:
    from Services.ContentService import *


class ContentController:
    @staticmethod
    def show_content(char_id):
        return ContentService.get_all_data(char_id)
