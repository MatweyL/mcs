from typing import List

from service.session.models import Session
from service.session.repo import SessionRepo


class InMemorySessionRepo(SessionRepo):
    def get_sessions(self, user_id: str) -> List[Session]:
        return []
