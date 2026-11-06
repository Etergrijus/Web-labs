from flask import jsonify
from peewee import IntegrityError, DataError
from random import randint

try:
    from Backend.database_conn import db
except ImportError as e:
    from database_conn import db

try:
    from Backend.Repository.QuestRepository import *
except ImportError as e:
    from Repository.QuestRepository import *

try:
    from Backend.Repository.ArchiveRepository import *
except ImportError as e:
    from Repository.ArchiveRepository import *

try:
    from Backend.Repository.CharacterRepository import *
except ImportError as e:
    from Repository.CharacterRepository import *

try:
    from Backend.Repository.TaskRepository import *
except ImportError as e:
    from Repository.TaskRepository import *


class QuestService:
    @staticmethod
    def add_quest(title, quest_type, char_id):
        if not all([title, quest_type, char_id]):
            return jsonify({'error': f'Missing required fields, ${title} ${quest_type} ${char_id}'}), 400
        try:
            with db.get_database().atomic():
                quest = QuestRepository.create_quest(title, quest_type, char_id)
                return jsonify({
                    'message': 'Quest add successfully',
                    'id': quest.id,
                    'title': quest.title,
                    'type': quest.type,
                    'status': quest.status,
                    'char_id': quest.character_id
                }), 201
        except IntegrityError as e:
            return jsonify({'error': 'foreign-key failed, incorrect character id'}), 409
        except DataError as e:
            return jsonify({'error': 'Unexpected quest type'}), 400
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
        except Exception as exp:
            return jsonify({'error': 'Internal server error'}), 500

    @staticmethod
    def remove_quest(quest_id):
        try:
            quest = QuestRepository.get_quest(quest_id)
            if quest.status != QuestStatus.IN_PROGRESS.value:
                try:
                    with db.get_database().atomic():
                        title = quest.title
                        character_id = quest.character_id
                        quest_type = quest.type
                        QuestRepository.delete_quest(quest_id)
                        QuestService._randomize_attribute(quest_type, character_id)
                        archive_notice = ArchiveRepository.create_archive_notice(title, character_id)

                        return jsonify({
                            'message': 'removing to archive',
                            'archive-id': archive_notice.id,
                            'datetime': archive_notice.completion_time
                        })
                except Exception as e:
                    return jsonify({'error': f'Error on removing quest {str(e)}'}), 400
            else:
                return jsonify({'error': 'Quest is still active'}), 405
        except Quest.DoesNotExist:
            return jsonify({'error': 'Quest not found'}), 404
        except Exception as e:
            return jsonify({'error': f'Internal server error {str(e)}'}), 500

    @staticmethod
    def get_tasks(quest_id):
        quest_tasks = {
            'tasks': []
        }

        tasks_data = TaskRepository.get_quest_tasks(quest_id)
        for task in tasks_data:
            task_dict = {
                'id': task['task_id'],
                'title': task['task_title'],
                'type': task['task_type'],
                'status': task['task_status'],
                'task_data': {}
            }

            if task_dict['type'] == TaskType.CYCLE.value:
                task_dict['task_data'] = {
                    'needful_count': task['cycle_needful_count'],
                    'done_count': task['cycle_done_count']
                }
            elif task_dict['type'] == TaskType.DEADLINE.value:
                task_dict['task_data'] = {
                    'deadline_date': task['deadline_date']
                }
            elif task_dict['type'] == TaskType.MONOTONOUS.value:
                task_dict['task_data'] = {
                    'needful_count': task['mt_needful_count'],
                    'done_count': task['mt_done_count'],
                    'period_value': task['period_value'],
                    'period_measure_unit': task['period_measure_unit']
                }

            quest_tasks['tasks'].append(task_dict)
        return jsonify(quest_tasks), 200

    @staticmethod
    def _randomize_attribute(quest_type, char_id):
        if quest_type == QuestType.MAIN.value:
            attr1 = randint(1, 4)
            CharacterRepository.update_attributes(attr1, char_id)
            attr2 = randint(1, 4)
            CharacterRepository.update_attributes(attr2, char_id)
        else:
            attr = randint(1, 4)
            CharacterRepository.update_attributes(attr, char_id)
