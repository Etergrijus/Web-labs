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
