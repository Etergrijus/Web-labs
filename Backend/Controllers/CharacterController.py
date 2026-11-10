try:
    from Backend.Services.CharacterService import *
except ImportError as e:
    from Services.CharacterService import *

from flask import session, jsonify


class ContentController:
    @staticmethod
    def show_content(char_id):
        if 'user_id' not in session:
            return jsonify({'error': 'Unauthorized'}), 401

        session_char_id = session.get('char_id')
        if session_char_id is None or session_char_id != char_id:
            return jsonify({'error': 'Forbidden: Character ID mismatch'}), 403

        return ContentService.get_all_data(char_id)
