from abc import abstractmethod
from typing import List

from service.core.use_case import UseCase, Request, Response
from service.session.models import Session


class GetSessionListRq(Request):
    user_uid: str


class SessionListRs(Response):
    def __init__(self, sessions: List[Session]):
        self.sessions = sessions


class GetSessionListUseCase(UseCase):
    @abstractmethod
    def apply(self, request: GetSessionListRq) -> SessionListRs:
        pass


class CreateSessionRq(Request):
    user_uid: str


class CreatedSessionRs(Response):
    def __init__(self, session: Session):
        self.session = session


class CreateSessionUseCase(UseCase):
    @abstractmethod
    def apply(self, request: CreateSessionRq) -> CreatedSessionRs:
        pass
