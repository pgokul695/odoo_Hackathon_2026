class AppException(Exception):
    def __init__(self, status_code: int, message: str, errors: dict = None):
        self.status_code = status_code
        self.message = message
        self.errors = errors or {}
