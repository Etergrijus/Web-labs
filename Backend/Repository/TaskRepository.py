from peewee import JOIN

try:
    from Backend.Models.models import Task, TaskType, CycleTask, DeadlineTask, MonotonousTask
except ImportError as e:
    from Models.models import Task, TaskType, CycleTask, DeadlineTask, MonotonousTask


class TaskRepository:
    @staticmethod
    def create_task(task_title, task_type, quest_id):
        task = Task.create(
            title=task_title,
            type=task_type,
            quest=quest_id
        )
        return task

    @staticmethod
    def create_cycle_task(task_id):
        return CycleTask.create(task=task_id)

    @staticmethod
    def create_deadline_task(task_id):
        return DeadlineTask.create(task=task_id)

    @staticmethod
    def create_monotonous_task(task_id):
        return MonotonousTask.create(task=task_id)

    @staticmethod
    def delete_task(task_id):
        task = Task.get(task_id)
        task.delete_instance()

    @staticmethod
    def get_task(task_id):
        return Task.get(task_id)

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

    @staticmethod
    def get_cycle_task(task_id):
        return CycleTask.select().where(CycleTask.task == task_id).first()

    @staticmethod
    def set_new_task_title(task_id, new_title):
        query = Task.update({Task.title: new_title}).where(Task.id == task_id)
        query.execute()

    @staticmethod
    def set_new_task_data(task_id, fields, task_type):
        query = None
        # Порядок полей аналогичен описанному в моделях
        if task_type == TaskType.CYCLE.value:
            query = (CycleTask.update({
                CycleTask.needful_count: fields[0]
            })
                     .where(CycleTask.task == task_id))

        elif task_type == TaskType.DEADLINE.value:
            query = (DeadlineTask.update({DeadlineTask.deadline_date: fields[0]})
                     .where(DeadlineTask.task == task_id))
        elif task_type == TaskType.MONOTONOUS.value:
            query = (MonotonousTask.update({
                MonotonousTask.needful_count: fields[0],
                MonotonousTask.period_value: fields[1],
                MonotonousTask.period_measure_unit: fields[2]
            }))
        query.execute()

    @staticmethod
    def toggle_status(task_id, new_status):
        query = Task.update({Task.status: new_status}).where(Task.id == task_id)
        query.execute()

    @staticmethod
    def increase_done_count(task_id, new_done_count):
        query = CycleTask.update({CycleTask.done_count: new_done_count}).where(CycleTask.task == task_id)
        query.execute()
