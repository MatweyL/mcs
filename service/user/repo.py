from abc import abstractmethod
from typing import Optional

from service.user.models import User


class UserRepo:
    @abstractmethod
    def get_user(self, username: str) -> Optional[User]:
        pass

    @abstractmethod
    def get_user_by_uid(self, uid: str) -> Optional[User]:
        pass

    @abstractmethod
    def save_user(self, user: User) -> User:
        pass
