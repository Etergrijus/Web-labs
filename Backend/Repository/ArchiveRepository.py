from datetime import datetime

try:
    from Backend.Models.models import Archive
except ImportError as e:
    from Models.models import Archive


class ArchiveRepository:
    @staticmethod
    def create_archive_notice(quest_title, character_id):
        archive_notice = Archive.create(
            quest_title=quest_title,
            completion_time=datetime.now().replace(second=0, microsecond=0),
            character=character_id,
        )
        return archive_notice

    @staticmethod
    def get_archive_notice(archive_id):
        return Archive.get(archive_id)