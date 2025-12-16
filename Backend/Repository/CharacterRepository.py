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
        return Character.select().where(Character.id == char_id).first()

    @staticmethod
    def update_attributes(attr, char_id):
        field = None
        match attr:
            case 1:
                field = Character.heart_value
            case 2:
                field = Character.bolt_value
            case 3:
                field = Character.star_value
            case 4:
                field = Character.gear_wheel_value

        char = Character.select(field).where(Character.id == char_id).first()
        attr_value = getattr(char, field.name)
        attr_value += 1
        query = Character.update({field: attr_value}).where(Character.id == char_id)
        query.execute()

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


