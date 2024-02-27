from service.core.group.repo import GroupRepo
from service.core.group.use_case import GetGroupListUseCase, GetGroupListRs, GetUserListByGroupUseCase, \
    GetUserListByGroupRq, UserListRs
from service.core.use_case import EmptyRequest


class GetGroupListUseCaseImpl(GetGroupListUseCase):
    def __init__(self, group_repo: GroupRepo):
        self.group_repo = group_repo

    def apply(self, request: EmptyRequest) -> GetGroupListRs:
        groups = self.group_repo.get_groups()
        return GetGroupListRs(groups=groups)


class GetUserListByGroupUseCaseImpl(GetUserListByGroupUseCase):
    def __init__(self, group_repo: GroupRepo):
        self.group_repo = group_repo

    def apply(self, request: GetUserListByGroupRq) -> UserListRs:
        users = self.group_repo.get_users_in_group(request.group_uid)
        return UserListRs(users=users)
