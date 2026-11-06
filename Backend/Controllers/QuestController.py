from flask import request

try:
    from Backend.Controllers.Controller import Controller
except ImportError as e:
    from Controllers.Controller import Controller

try:
    from Backend.Services.QuestService import *
except ImportError as e:
    from Services.QuestService import *


class QuestController(Controller):
    def __init__(self):
        super(QuestController, self).__init__()

    @staticmethod
    def add_quest():
        data = request.get_json()
        error = QuestController._validate(data)
        if error:
            return error

        title = data.get('title')
        quest_type = data.get('type')
        char_id = data.get('char_id')
        return QuestService.add_quest(title, quest_type, char_id)

    @staticmethod
    def delete_quest(quest_id):
        return QuestService.delete_quest(quest_id)

    @staticmethod
    def update_title_in_quest(quest_id):
        data = request.get_json()
        error = QuestController._validate(data)
        if error:
            return error

        new_title = data.get('new_title')
        return QuestService.update_quest(quest_id, new_title)

    @staticmethod
    def get_quest_tasks(quest_id):
        # data = request.get_json()
        # error = QuestController._validate(data)
        # if error:
        #     return error
        #
        return QuestService.get_tasks(quest_id)

    @staticmethod
    def complete_quest(quest_id):
        return QuestService.remove_quest(quest_id)
