from service.common.logs import logger
from service.core.group.use_case import GetGroupListUseCase, GetUserListByGroupUseCase, GetUserListByGroupRq
from service.core.use_case import EmptyRequest


class GroupEndpoint:
    def __init__(self, get_group_list_use_case: GetGroupListUseCase,
                 get_user_list_by_group_use_case: GetUserListByGroupUseCase):
        self.get_group_list_use_case = get_group_list_use_case
        self.get_user_list_by_group_use_case = get_user_list_by_group_use_case

    def get_groups(self):
        try:
            return self.get_group_list_use_case.apply(EmptyRequest())
        except BaseException as e:
            logger.exception(e)

    def get_users_by_group(self, request: GetUserListByGroupRq):
        try:
            return self.get_user_list_by_group_use_case.apply(request)
        except BaseException as e:
            logger.exception(e)