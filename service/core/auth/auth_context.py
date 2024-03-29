from typing import Optional

from service.domain.user import User


class AuthContext:
    user = None

    @staticmethod
    def set_user(user: User):
        AuthContext.user = user

    @staticmethod
    def get_now_user() -> Optional[User]:
        return AuthContext.user
