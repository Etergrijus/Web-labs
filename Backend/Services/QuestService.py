from flask import jsonify
from peewee import IntegrityError

try:
    from Backend.database_conn import db
except ImportError as e:
    from database_conn import db

try:
    from Backend.Repository.QuestRepository import *
except ImportError as e:
    from Repository.QuestRepository import *


# try:
#     from Backend.Repository.TaskRepository import *
# except ImportError as e:
#     from Repository.TaskRepository import *


class QuestService:
    @staticmethod
    def create_quest(title, quest_type, char_id):
        if not all([title, quest_type, char_id]):
            return jsonify({'error': 'Missing required fields'}), 400
        try:
            with db.get_database().atomic():
                quest = QuestRepository.add_quest(title, quest_type, char_id)
                return jsonify({
                    'message': 'Quest add successfully',
                    'id': quest.id,
                    'title': quest.title,
                    'type': quest.type,
                    'status': quest.status,
                    'char-id': quest.character_id
                }), 201

        except Exception as e:
            return jsonify({'error': 'Internal server error'}), 500

    @staticmethod
    def delete_quest(quest_id):
        try:
            with db.get_database().atomic():
                QuestRepository.delete_quest(quest_id)
                return '', 204
        except Quest.DoesNotExist:
            return jsonify({'error': 'Quest not found'}), 404
        except Exception as e:
            return jsonify({'error': 'Internal server error'}), 500

    @staticmethod
    def update_quest(quest_id, new_title):
        if not all([new_title]):
            return jsonify({'error': 'Missing required fields'}), 400

        try:
            with db.get_database().atomic():
                QuestRepository.set_new_quest_title(quest_id, new_title)
                return jsonify({
                    'message': 'quest updates successfully',
                    'title': f'{QuestRepository.get_quest(quest_id).title}'
                    }), 200
        except IntegrityError as e:
            return jsonify({'error': 'Null value is unacceptable'}), 409
        except Exception as e:
            return jsonify({'error': 'Internal server error'}), 500
