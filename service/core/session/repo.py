from abc import abstractmethod
from typing import List

from service.domain.session import Session


class SessionRepo:
    @abstractmethod
    def get_sessions(self, user_id: str) -> List[Session]:
        pass

    @abstractmethod
    def save_session(self, session: Session) -> Session:
        pass

    @abstractmethod
    def get_session(self, session_id: str) -> Session:
        pass
