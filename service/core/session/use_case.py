from abc import abstractmethod
from typing import List

from service.core.use_case import UseCase, Request, Response
from service.domain.session import Session


class GetSessionListRq(Request):
    user_uid: str


class SessionListRs(Response):
    def __init__(self, sessions: List[Session]):
        self.sessions = sessions


class StartSessionRq(Request):
    session_uid: str


class FinishSessionRq(Request):
    session_uid: str


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


class StartSessionUseCase(UseCase):
    @abstractmethod
    def apply(self, request: StartSessionRq) -> Response:
        pass


class FinishSessionUseCase(UseCase):
    @abstractmethod
    def apply(self, request: FinishSessionRq) -> Response:
        pass
