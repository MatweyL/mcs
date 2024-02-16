from abc import abstractmethod
from typing import List

from service.session.models import Session


class SessionRepo:
    @abstractmethod
    def get_sessions(self, user_id: str) -> List[Session]:
        pass
