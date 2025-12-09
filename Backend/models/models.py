from peewee import Model, BigAutoField, CharField, TextField, IntegerField, Check, SQL, ForeignKeyField
# for local run
# from Backend.database_conn import db

# for Docker run
try:
    from ..database_conn import db
except ImportError as e:
    from database_conn import db


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
    gear_wheel_value = IntegerField(constraints=[Check('gear_wheel_value >= 0'), SQL('DEFAULT 0')]),
    user = ForeignKeyField(User, on_delete='CASCADE', unique=True, backref='character')

    class Meta:
        table_name = 'characters'
