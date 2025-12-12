from datetime import datetime

from peewee import Model, BigAutoField, CharField, TextField, IntegerField, Check, SQL, ForeignKeyField, BooleanField
from enum import Enum

from playhouse.postgres_ext import DateTimeTZField

# for local run
# from Backend.database_conn import db

# for Docker run
try:
    from ..database_conn import db
except ImportError as e:
    from database_conn import db


class QuestType(Enum):
    MAIN = 'Main'
    SIDE = 'Side'


class QuestStatus(Enum):
    IN_PROGRESS = 'In progress'
    FAILED = 'Failed'
    SUCCESSFUL = 'Successful'


class TaskType(Enum):
    SIMPLE = 'Simple'
    CYCLE = 'Cycle'
    DEADLINE = 'Deadline'
    MONOTONOUS = 'Monotonous'


class TimeMeasureUnits(Enum):
    MINUTE = 'minute'
    HOUR = 'hour'
    DAY = 'day'
    WEEK = 'week'
    MONTH = 'month'
    YEAR = 'year'


class BaseModel(Model):
    class Meta:
        database = db.get_database()


class User(BaseModel):
    id = BigAutoField(primary_key=True)
    username = CharField(max_length=32, unique=True, null=False)
    password = TextField(null=False)

    class Meta:
        table_name = 'users'


class Character(BaseModel):
    id = BigAutoField(primary_key=True)
    char_name = CharField(max_length=32, null=False)
    image_url = TextField(null=True)
    heart_value = IntegerField(constraints=[Check('heart_value >= 0'), SQL('DEFAULT 0')])
    bolt_value = IntegerField(constraints=[Check('bolt_value >= 0'), SQL('DEFAULT 0')])
    star_value = IntegerField(constraints=[Check('star_value >= 0'), SQL('DEFAULT 0')])
    gear_wheel_value = IntegerField(constraints=[Check('gear_wheel_value >= 0'), SQL('DEFAULT 0')])
    user = ForeignKeyField(User, on_delete='CASCADE', unique=True, backref='character')

    class Meta:
        table_name = 'characters'


class Quest(BaseModel):
    id = BigAutoField(primary_key=True)
    title = TextField(null=False)
    type = CharField(choices=[(e.value, e.name) for e in QuestType], null=False)
    status = CharField(choices=[(e.value, e.name) for e in QuestStatus], null=False,
                       default=QuestStatus.IN_PROGRESS.value)
    character = ForeignKeyField(Character, on_delete='CASCADE', backref='quests')

    class Meta:
        table_name = 'quests'


class Task(BaseModel):
    id = BigAutoField(primary_key=True)
    title = TextField(null=False)
    type = CharField(choices=[(e.value, e.name) for e in TaskType], null=False)
    status = BooleanField(null=False, default=False)
    quest = ForeignKeyField(Quest, backref='tasks', on_delete='CASCADE')

    class Meta:
        table_name = 'tasks'


class CycleTask(BaseModel):
    id = BigAutoField(primary_key=True)
    needful_count = IntegerField(null=False, default=1)
    done_count = IntegerField(null=False, default=0)
    task = ForeignKeyField(Task, backref='cycle_task', on_delete='CASCADE')

    class Meta:
        table_name = 'cycle_tasks'


class DeadlineTask(BaseModel):
    id = BigAutoField(primary_key=True)
    deadline_date = DateTimeTZField(null=False, default=datetime(2030, 1, 1, 0, 0, 0))
    task = ForeignKeyField(Task, backref='deadline_task', on_delete='CASCADE')

    class Meta:
        table_name = 'deadline_tasks'


class MonotonousTask(BaseModel):
    id = BigAutoField(primary_key=True)
    needful_count = IntegerField(null=False, default=3)
    done_count = IntegerField(null=False, default=0)
    period_value = IntegerField(null=False, default=1)
    period_measure_unit = CharField(choices=[(e.value, e.name) for e in TimeMeasureUnits],
                                    null=False, default=TimeMeasureUnits.DAY.value)
    task = ForeignKeyField(Task, backref='monotonous_task', on_delete='CASCADE')

    class Meta:
        table_name = 'monotonous_tasks'


class Archive(BaseModel):
    id = BigAutoField(primary_key=True)
    quest_title = TextField(null=False)
    completion_time = DateTimeTZField(null=False)
    character = ForeignKeyField(Character, backref='archived_quests', on_delete='CASCADE')

    class Meta:
        table_name = 'archive'
