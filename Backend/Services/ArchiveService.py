from flask import jsonify
from peewee import IntegrityError, DataError
from random import randint

try:
    from Backend.database_conn import db
except ImportError as e:
    from database_conn import db

try:
    from Backend.Repository.ArchiveRepository import *
except ImportError as e:
    from Repository.ArchiveRepository import *


class ArchiveService:
    @staticmethod
    def show_all(char_id):
        archive = ArchiveRepository.get_archive(char_id)
        if not archive:
            return jsonify({'error': 'there is no corresponding character (and user)'}), 404
        data = {
            'archive': []
        }

        for notice in archive:
            notice_dict = {
                'id': notice.id,
                'title': notice.quest_title,
                'completion_time': notice.completion_time
            }
            data['archive'].append(notice_dict)
        return jsonify(data), 200
