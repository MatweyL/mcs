from abc import abstractmethod, ABC
from typing import Optional

from service.domain.user import User


class UserRepo(ABC):
    @abstractmethod
    def get_user(self, username: str) -> Optional[User]:
        pass

    @abstractmethod
    def get_user_by_uid(self, uid: str) -> Optional[User]:
        pass

    @abstractmethod
    def save_user(self, user: User) -> User:
        pass
