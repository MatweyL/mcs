from typing import Optional, List

from service.common.utils import generate_uid
from service.core.user.repo import UserRepo
from service.db.db import JsonDb
from service.domain.user import User
from service.mapper.mapper import UserMapper


class UserRepoDecorator(UserRepo):
    def __init__(self,
                 delegates: List[UserRepo]):
        self.delegates = delegates

    def get_user(self, username: str) -> Optional[User]:
        for delegate in self.delegates:
            user = delegate.get_user(username)
            if user:
                return user
        return None

    def get_user_by_uid(self, uid: str) -> Optional[User]:
        for delegate in self.delegates:
            user = delegate.get_user_by_uid(uid)
            if user:
                return user
        return None

    def save_user(self, user: User) -> User:
        pass


class InMemoryUserRepo(UserRepo):
    def __init__(self,
                 db: JsonDb,
                 mapper: UserMapper,
                 name: str):
        self.db = db
        self.mapper = mapper
        self.name = name

    def get_user_by_uid(self, uid: str) -> Optional[User]:
        json = self.db.get_json()
        users = json[self.name]
        user = next(filter(lambda x: x.get('uid') == uid, users), None)
        return self.mapper.map_to_domain(user) if user else None

    def get_user(self, username: str) -> Optional[User]:
        json = self.db.get_json()
        users = json[self.name]
        user = next(filter(lambda x: x['name'] == username, users), None)
        return self.mapper.map_to_domain(user) if user else None

    def save_user(self, user: User) -> User:
        if not hasattr(user, 'uid'):
            user.uid = generate_uid()

        json = self.db.get_json()
        users = json[self.name]
        index = next((i for i, u in enumerate(users) if u.get('uid', None) == user.uid), None)

        user_json = self.mapper.map_to_entity(user)
        if index:
            users[index] = user_json
        else:
            users.append(user_json)

        self.db.save_json(json)

        return user
