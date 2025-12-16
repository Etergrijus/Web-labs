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
try:
    from Backend.Repository.QuestRepository import *
except ImportError as e:
    from Repository.QuestRepository import *


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

                QuestRepository.toggle_quest_status(quest_id, QuestStatus.IN_PROGRESS.value)
                quest = QuestRepository.get_quest(int(quest_id))
                return jsonify({
                    'message': 'Task created successfully',
                    'id': task.id,
                    'title': task.title,
                    'type': task.type,
                    'status': task.status,
                    'quest-id': task.quest_id,
                    'task-data': task_data,
                    'quest-status': quest.status
                }), 201
        except IntegrityError as e:
            return jsonify({'error': 'foreign-key failed, incorrect quest id'}), 409
        except DataError as e:
            return jsonify({'error': f'Unexpected task type {str(e)}'}), 400
        except Exception as e:
            return jsonify({'error': 'Internal server error'}), 500

    @staticmethod
    def delete_task(task_id):
        try:
            with db.get_database().atomic():
                task = TaskRepository.get_task(task_id)
                quest_id = task.quest_id
                TaskRepository.delete_task(task_id)

                if TaskService._check_quest_status(quest_id):
                    QuestRepository.toggle_quest_status(task.quest_id, QuestStatus.SUCCESSFUL.value)
                return jsonify({'quest-status': f'{QuestRepository.get_quest(task.quest_id).status}'}), 200
        except Task.DoesNotExist:
            return jsonify({'error': 'Task not found'}), 404
        except Exception as e:
            return jsonify({'error': 'Internal server error'}), 500

    @staticmethod
    def update_task(task_id, task_title, task_data):
        # Сначала обновляем название, если указано
        if task_title:
            TaskRepository.set_new_task_title(task_id, task_title)

        # Теперь меняем taskData в зависимости от типа
        if task_data:
            try:
                task = TaskRepository.get_task(task_id)
                data_fields = []
                if task.type == TaskType.CYCLE.value:
                    needful_count = task_data.get('needful_count')

                    data_fields.append(needful_count)
                elif task.type == TaskType.DEADLINE.value:
                    deadline_date = task_data.get('deadline_date')

                    data_fields.append(deadline_date)
                elif task.type == TaskType.MONOTONOUS.value:
                    needful_count = task_data.get('needful_count')
                    period_value = task_data.get('period_value')
                    period_measure_unit = task_data.get('period_measure_unit')

                    data_fields.append(needful_count)
                    data_fields.append(period_value)
                    data_fields.append(period_measure_unit)

                if not all(data_fields):
                    return jsonify({'error': 'Data update without required fields'}), 400

                with db.get_database().atomic():
                    TaskRepository.set_new_task_data(task_id, data_fields, task.type)
            except Task.DoesNotExist:
                return jsonify({'error': 'Task not found'}), 404
            except Exception as e:
                return jsonify({'error': f'task_data update failed with {str(e)}'}), 500

        return '', 204

    @staticmethod
    def task_action(task_id, task_data):
        try:
            task = TaskRepository.get_task(task_id)
            with db.get_database().atomic():
                if task.type == TaskType.SIMPLE.value:
                    status = task.status
                    status = not status
                    TaskRepository.toggle_status(task_id, status)
                elif task.type == TaskType.CYCLE.value:
                    cycle_task = TaskRepository.get_cycle_task(task_id)
                    json_done_count = int(task_data.get('done_count'))
                    TaskRepository.increase_done_count(task_id, json_done_count)

                    if json_done_count == cycle_task.needful_count:
                        TaskRepository.toggle_status(task_id, True)
                    elif task.status is True and json_done_count < cycle_task.needful_count:
                        TaskRepository.toggle_status(task_id, False)

            # Проверяем статус задач в квесте
            if TaskService._check_quest_status(task.quest_id):
                QuestRepository.toggle_quest_status(task.quest_id, QuestStatus.SUCCESSFUL.value)

            return jsonify({
                'message': 'Action done successfully',
                'quest-status': f'{QuestRepository.get_quest(task.quest_id).status}'
            }), 200
        except Task.DoesNotExists:
            return jsonify({'error': 'Task not found'}), 404
        except Exception as e:
            return jsonify({'error': f'task_data update failed with {str(e)}'}), 500

    @staticmethod
    def _check_quest_status(quest_id):
        quest_tasks = TaskRepository.get_quest_tasks(quest_id)
        for task in quest_tasks:
            status = task['task_status']
            if status is False:
                QuestRepository.toggle_quest_status(quest_id, QuestStatus.IN_PROGRESS.value)
                return False
        return True
