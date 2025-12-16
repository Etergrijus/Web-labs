from flask import Flask, request
from flask_cors import CORS

from Controllers.QuestController import QuestController
from Controllers.AuthController import AuthController
from Controllers.ContentController import ContentController
from Controllers.TaskController import TaskController
from config import config

app = Flask(__name__)
app.secret_key = config.API_KEY

CORS(app)


@app.route('/')
def hello():
    return "Hello from Flask Backend!"


@app.route('/register', methods=['POST'])
def register_endpoint():
    return AuthController.register()


@app.route('/login', methods=['POST'])
def login_endpoint():
    return AuthController.login()


@app.route('/character/<int:char_id>', methods=['GET'])
def fetch_data_endpoint(char_id):
    return ContentController.show_content(char_id)


@app.route('/quest', methods=['POST'])
def create_quest_endpoint():
    return QuestController.add_quest()


@app.route('/quest/<int:quest_id>', methods=['GET', 'PATCH', 'DELETE'])
def quest_rud_endpoint(quest_id):
    if request.method == 'DELETE':
        return QuestController.delete_quest(quest_id)
    elif request.method == 'PATCH':
        return QuestController.update_title_in_quest(quest_id)
    elif request.method == 'GET':
        return QuestController.remove_quest(quest_id)


@app.route('/task', methods=['POST'])
def create_task_endpoint():
    return TaskController.add_task()


@app.route('/task/<int:task_id>', methods=['PATCH', 'DELETE'])
def task_ud_endpoint(task_id):
    if request.method == 'DELETE':
        return TaskController.delete_task(task_id)
    elif request.method == 'PATCH':
        return TaskController.update_task(task_id)


@app.route('/task/<int:task_id>', methods=['POST'])
def task_action_endpoint(task_id):
    return TaskController.update_task_after_action(task_id)


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)
