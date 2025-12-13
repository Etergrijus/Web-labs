from peewee import JOIN

try:
    from Backend.Models.models import Task, TaskType, CycleTask, DeadlineTask, MonotonousTask
except ImportError as e:
    from Models.models import Task, TaskType, CycleTask, DeadlineTask, MonotonousTask


class TaskRepository:
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