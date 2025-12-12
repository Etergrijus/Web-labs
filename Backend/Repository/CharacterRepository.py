from peewee import JOIN

try:
    from Backend.Models.models import Character, Quest, Task, TaskType, CycleTask, DeadlineTask, MonotonousTask
except ImportError as e:
    from Models.models import Character, Quest, Task, TaskType, CycleTask, DeadlineTask, MonotonousTask


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
        query = Character.select(
            Character.char_name,
            Character.image_url,
            Character.heart_value,
            Character.bolt_value,
            Character.star_value,
            Character.gear_wheel_value
        )

        # Далее вызываем .where() на созданном запросе
        return query.where(Character.id == char_id).first()

    @staticmethod
    def get_all_quests_super():
        query = (
            Character
            .select(Character.id,
                    Quest.id, Quest.title, Quest.type, Quest.status,
                    Task.id, Task.title, Task.type, Task.status, Task.quest_id,
                    CycleTask.needful_count, CycleTask.done_count,
                    DeadlineTask.deadline_date,
                    MonotonousTask.needful_count, MonotonousTask.done_count, MonotonousTask.period_value,
                    MonotonousTask.period_measure_unit)
            .join(Quest)
            .join(Task, JOIN.LEFT)
            .join(CycleTask, JOIN.LEFT, on=((Task.id == CycleTask.task) & (Task.type == TaskType.CYCLE)))
            .join(DeadlineTask, JOIN.LEFT, on=((Task.id == DeadlineTask.task) & (Task.type == TaskType.DEADLINE)))
            .join(MonotonousTask, JOIN.LEFT, on=((Task.id == MonotonousTask.task) & (Task.type == TaskType.MONOTONOUS)))
            .order_by(Quest.id)
        )
        return query

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
    def get_quest_tasks(quest_id):
        query = (
            Task
            .select(Task.id.alias('task_id'),
                    Task.title.alias('task_title'),
                    Task.type.alias('task_type'),
                    Task.status.alias('task_status'),
                    Task.quest_id.alias('task_quest_id'),
                    CycleTask.needful_count.alias('cycle_needful_count'),
                    CycleTask.done_count.alias('cycle_done_count'),
                    DeadlineTask.deadline_date.alias('deadline_date'),
                    MonotonousTask.needful_count.alias('mt_needful_count'),
                    MonotonousTask.done_count.alias('mt_done_count'),
                    MonotonousTask.period_value.alias('period_value'),
                    MonotonousTask.period_measure_unit.alias('period_measure_unit')
                    )
            .join(
                CycleTask,
                JOIN.LEFT_OUTER,
                on=((Task.id == CycleTask.task) & (Task.type == TaskType.CYCLE.value))
            )
            .join(
                DeadlineTask,
                JOIN.LEFT_OUTER,
                on=((Task.id == DeadlineTask.task) & (Task.type == TaskType.DEADLINE.value))
            )
            .join(
                MonotonousTask,
                JOIN.LEFT_OUTER,
                on=((Task.id == MonotonousTask.task) & (Task.type == TaskType.MONOTONOUS.value))
            )
            .where(Task.quest == quest_id)
            .order_by(Task.id)
        )
        return query.dicts()
