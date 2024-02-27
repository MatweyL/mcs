from abc import abstractmethod
from typing import List

from service.core.use_case import Response, UseCase, EmptyRequest, Request
from service.domain.group import Group
from service.domain.user import User


class GetGroupListRs(Response):
    def __init__(self, groups: List[Group]) -> None:
        self.groups = groups


class GetGroupListUseCase(UseCase):
    @abstractmethod
    def apply(self, request: EmptyRequest) -> GetGroupListRs:
        pass


class GetUserListByGroupRq(Request):
    group_uid: str


class UserListRs(Response):
    def __init__(self, users: List[User]) -> None:
        self.users = users


class GetUserListByGroupUseCase(UseCase):
    @abstractmethod
    def apply(self, request: GetUserListByGroupRq) -> UserListRs:
        pass
