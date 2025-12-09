from config import config
from peewee import PostgresqlDatabase


class database_manager:
    def __init__(self):
        self._db = PostgresqlDatabase(config.DB,
                                      user=config.DB_USER,
                                      password=config.DB_PASSWORD,
                                      host=config.DB_HOST,
                                      port=config.DB_PORT)
        self._db.connect()

    def __del__(self):
        self._db.close()

    def get_database(self):
        return self._db


db = database_manager()