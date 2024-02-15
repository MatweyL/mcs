from abc import abstractmethod
from typing import Optional

from service.user.models import User


class UserRepo:
    @abstractmethod
    def get_user(self, username: str) -> Optional[User]:
        pass

    @abstractmethod
    def save_user(self, user: User):
        pass