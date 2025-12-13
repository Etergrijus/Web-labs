try:
    from Backend.Models.models import Character
except ImportError as e:
    from Models.models import Character


class CharacterRepository:
    @staticmethod
    def create_character(char_name, user):
        character = Character.create(
            char_name=char_name,
            user=user
        )
        return character

    @staticmethod
    def get_character_info(char_id: int):
        # Query должен начинаться с Model.select()

        # Далее вызываем .where() на созданном запросе
        return Character.select().where(Character.id == char_id).first()

    # @staticmethod
    # def get_all_quests_super():
    #     query = (
    #         Character
    #         .select(Character.id,
    #                 Quest.id, Quest.title, Quest.type, Quest.status,
    #                 Task.id, Task.title, Task.type, Task.status, Task.quest_id,
    #                 CycleTask.needful_count, CycleTask.done_count,
    #                 DeadlineTask.deadline_date,
    #                 MonotonousTask.needful_count, MonotonousTask.done_count, MonotonousTask.period_value,
    #                 MonotonousTask.period_measure_unit)
    #         .join(Quest)
    #         .join(Task, JOIN.LEFT)
    #         .join(CycleTask, JOIN.LEFT, on=((Task.id == CycleTask.task) & (Task.type == TaskType.CYCLE)))
    #         .join(DeadlineTask, JOIN.LEFT, on=((Task.id == DeadlineTask.task) & (Task.type == TaskType.DEADLINE)))
    #         .join(MonotonousTask, JOIN.LEFT, on=((Task.id == MonotonousTask.task) & (Task.type == TaskType.MONOTONOUS)))
    #         .order_by(Quest.id)
    #     )
    #     return query


