from flask import jsonify


class Controller:
    @staticmethod
    def _validate(data):
        if not data:
            return jsonify({'error': 'No data'}), 400
