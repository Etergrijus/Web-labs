from flask import jsonify

try:
    from Backend.Repository.CharacterRepository import *
except ImportError as e:
    from Repository.CharacterRepository import *


class ContentService:
    @staticmethod
    def get_all_data(char_id):
        character = CharacterRepository.get_character_info(char_id)
        if not character:
            return jsonify({'error': 'there is no corresponding character (and user)'}), 404
        character_data = {
            'char_name': character.char_name,
            'image_url': character.image_url,
            'heart_value': character.heart_value,
            'bolt_value': character.bolt_value,
            'star_value': character.star_value,
            'gear_wheel_value': character.gear_wheel_value,
            'quests': []
        }

        quests_data = CharacterRepository.get_all_quests(char_id)
        for quest in quests_data:
            quest_dict = {
                'id': quest.id,
                'title': quest.title,
                'type': quest.type,
                'status': quest.status,
                'tasks': []
            }

            tasks_data = CharacterRepository.get_quest_tasks(quest.id)
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

                quest_dict['tasks'].append(task_dict)
            character_data['quests'].append(quest_dict)
        return jsonify(character_data), 200
