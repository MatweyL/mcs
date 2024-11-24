from abc import abstractmethod
from typing import List

from service.domain.group import Group
from service.domain.user import User


class GroupRepo:
    @abstractmethod
    def get_groups(self) -> List[Group]:
        pass

    @abstractmethod
    def get_users_in_group(self, group_id: str) -> List[User]:
        pass
