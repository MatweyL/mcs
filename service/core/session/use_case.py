from abc import abstractmethod
from typing import List

from service.core.session.training import TrainingResult
from service.core.use_case import UseCase, Request, Response
from service.domain.session import Session, SessionStatus


class GetSessionListRq(Request):
    user_uid: str


class SessionListRs(Response):
    def __init__(self, sessions: List[Session]):
        self.sessions = sessions


class GetSessionListUseCase(UseCase):
    @abstractmethod
    def apply(self, request: GetSessionListRq) -> SessionListRs:
        pass


class SessionRq(Request):
    training: str


class CreateSessionRq(Request):
    user_uid: str
    session: SessionRq


class CreatedSessionRs(Response):
    def __init__(self, session: Session):
        self.session = session


class CreateSessionUseCase(UseCase):
    @abstractmethod
    def apply(self, request: CreateSessionRq) -> CreatedSessionRs:
        pass


class StartSessionRq(Request):
    session_uid: str


class StartedSessionRs(Response):
    def __init__(self, session_status: SessionStatus, already_started: bool = False):
        self.session_status = session_status
        self.already_started = already_started


class StartSessionUseCase(UseCase):
    @abstractmethod
    def apply(self, request: StartSessionRq) -> StartedSessionRs:
        pass


class FinishSessionRq(Request):
    session_uid: str


class FinishedSessionRs(Response):
    def __init__(self, training_result: TrainingResult):
        self.training_result = training_result


class FinishSessionUseCase(UseCase):
    @abstractmethod
    def apply(self, request: FinishSessionRq) -> FinishedSessionRs:
        pass
