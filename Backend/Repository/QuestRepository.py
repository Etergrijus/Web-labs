try:
    from Backend.Models.models import Quest, QuestStatus
except ImportError as e:
    from Models.models import Quest, QuestStatus


class QuestRepository:
    @staticmethod
    def get_all_quests(char_id):
        query = (
            Quest
            .select(Quest.id, Quest.title, Quest.type, Quest.status)
            .where(Quest.character == char_id)
            .order_by(Quest.id)
        )
        return query

    @staticmethod
    def get_quest(quest_id):
        return Quest.get(quest_id)

    @staticmethod
    def create_quest(title, quest_type, char_id):
        quest = Quest.create(
            title=title,
            type=quest_type,
            character=char_id
        )
        return quest

    @staticmethod
    def delete_quest(quest_id):
        quest = QuestRepository.get_quest(quest_id)
        quest.delete_instance()

    @staticmethod
    def set_new_quest_title(quest_id, new_title):
        query = Quest.update({Quest.title: new_title}).where(Quest.id == quest_id)
        query.execute()

    @staticmethod
    def toggle_quest_status(quest_id, new_status):
        query = Quest.update({Quest.status: new_status}).where(Quest.id == quest_id)
        query.execute()
