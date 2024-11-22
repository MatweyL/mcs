from typing import List

from service.core.group.repo import GroupRepo
from service.db.db import JsonDb
from service.domain.user import User
from service.mapper_v2.mapper import GroupMapper, StudentMapper


class GroupRepoImpl(GroupRepo):

    def __init__(self,
                 db: JsonDb,
                 group_mapper: GroupMapper,
                 user_mapper: StudentMapper):
        self.db = db
        self.group_mapper = group_mapper
        self.user_mapper = user_mapper

    def get_groups(self):
        json = self.db.get_json()
        groups = json['groups']
        return [self.group_mapper.map_to_domain(g) for g in groups]

    def get_users_in_group(self, group_uid: str) -> List[User]:
        json = self.db.get_json()
        users = json['users']
        return \
            list(
                map(self.user_mapper.map_to_domain,
                    filter(
                        lambda x: x['group'] == group_uid, users)
                    )
            )
