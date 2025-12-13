from flask import jsonify
from peewee import IntegrityError, DataError

try:
    from Backend.database_conn import db
except ImportError as e:
    from database_conn import db
try:
    from Backend.Repository.TaskRepository import *
except ImportError as e:
    from Repository.TaskRepository import *


class TaskService:
    @staticmethod
    def add_task(task_title, task_type, quest_id):
        if not all([task_title, task_type, quest_id]):
            return jsonify({'error': 'Missing required fields'}), 400

        try:
            with db.get_database().atomic():
                task = TaskRepository.create_task(task_title, task_type, quest_id)

                task_data = {}
                if task.type == TaskType.CYCLE.value:
                    cycle_task = TaskRepository.create_cycle_task(task.id)
                    task_data = {
                        'needful_count': cycle_task.needful_count,
                        'done_count': cycle_task.done_count
                    }
                elif task.type == TaskType.DEADLINE.value:
                    deadline_task = TaskRepository.create_deadline_task(task.id)
                    task_data = {
                        'deadline_date': deadline_task.deadline_date
                    }
                elif task.type == TaskType.MONOTONOUS.value:
                    monotonous_task = TaskRepository.create_monotonous_task(task.id)
                    task_data = {
                        'needful_count': monotonous_task.needful_count,
                        'done_count': monotonous_task.done_count,
                        'period_value': monotonous_task.period_value,
                        'period_measure_unit': monotonous_task.period_measure_unit
                    }

                return jsonify({
                    'message': 'Task created successfully',
                    'id': task.id,
                    'title': task.title,
                    'type': task.type,
                    'status': task.status,
                    'quest-id': task.quest_id,
                    'task-data': f'{task_data}'
                }), 201
        except IntegrityError as e:
            return jsonify({'error': 'foreign-key failed, incorrect quest id'}), 409
        except DataError as e:
            return jsonify({'error': 'Unexpected task type'}), 400
        except Exception as e:
            return jsonify({'error': 'Internal server error'}), 500

    @staticmethod
    def delete_task(task_id):
        try:
            with db.get_database().atomic():
                TaskRepository.delete_task(task_id)
                return '', 204
        except Task.DoesNotExist:
            return jsonify({'error': 'Task not found'}), 404
        except Exception as e:
            return jsonify({'error': 'Internal server error'}), 500
