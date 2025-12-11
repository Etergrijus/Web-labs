try:
    from Backend.Models.models import User
except ImportError as e:
    from Models.models import User

from werkzeug.security import generate_password_hash, check_password_hash


class UserRepository:
    @staticmethod
    def create_user(username, password):
        user = User.create(
            username=username,
            password=generate_password_hash(password)
        )
        return user

    @staticmethod
    def find_user(username):
        return User.select().where(User.username == username).first()

    @staticmethod
    def check_passwod(user, password):
        return check_password_hash(user.password, password)
