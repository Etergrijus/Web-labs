from flask import request

try:
    from Backend.Controllers.Controller import Controller
except ImportError as e:
    from Controllers.Controller import Controller

try:
    from Backend.Services.TaskService import *
except ImportError as e:
    from Services.TaskService import *


class TaskController(Controller):
    def __init__(self):
        super(TaskController, self).__init__()

    @staticmethod
    def add_task():
        data = request.get_json()
        error = TaskController._validate(data)
        if error:
            return error

        task_title = data.get('title')
        task_type = data.get('type')
        quest_id = data.get('quest-id')
        return TaskService.add_task(task_title, task_type, quest_id)

    @staticmethod
    def delete_task(task_id):
        return TaskService.delete_task(task_id)
