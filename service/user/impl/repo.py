from typing import Optional

from service.user.models import User
from service.user.repo import UserRepo


class InMemoryUserRepo(UserRepo):
    def __init__(self):
        self.users = {}

    def get_user(self, username: str) -> Optional[User]:
        return self.users[username]

    def save_user(self, user: User):
        self.users[user.name] = user
