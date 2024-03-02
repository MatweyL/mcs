from datetime import datetime

from service.common.utils import now
from service.core.session import StartSessionRq, StartedSessionRs
from service.core.session.repo import SessionRepo
from service.core.session.training import TrainingResultCalculatorService
from service.core.session.use_case import GetSessionListUseCase, GetSessionListRq, SessionListRs, CreateSessionUseCase, \
    CreateSessionRq, CreatedSessionRs, StartSessionUseCase, FinishSessionUseCase, FinishedSessionRs, FinishSessionRq
from service.domain.phone import Phone
from service.domain.session import Session, SessionStatus, SessionAttempt


class GetSessionListUseCaseImpl(GetSessionListUseCase):
    def __init__(self, session_repo: SessionRepo):
        self.session_repo = session_repo

    def apply(self, request: GetSessionListRq) -> SessionListRs:
        sessions = self.session_repo.get_sessions(request.user_uid)
        return SessionListRs(sessions=sessions)


class CreateSessionUseCaseImpl(CreateSessionUseCase):
    def __init__(self, session_repo: SessionRepo):
        self.session_repo = session_repo

    def apply(self, request: CreateSessionRq) -> CreatedSessionRs:
        session = Session()
        session.user_uid = request.user_uid
        session.title = 'УТК-X'
        session.date = now()
        session.phone = Phone()

        self.session_repo.save_session(session)

        return CreatedSessionRs(session=session)


class StartSessionUseCaseImpl(StartSessionUseCase):
    def __init__(self, session_repo: SessionRepo):
        self.session_repo = session_repo

    def apply(self, request: StartSessionRq) -> StartedSessionRs:
        session = self.session_repo.get_session(request.session_uid)
        # Нужно понять, когда сессия создана (STARTED), когда она уже создана (IN_WORK)
        if session.status == SessionStatus.READY:
            session.status = SessionStatus.STARTED
            session_attempt = SessionAttempt(started=datetime.now())
            session.attempts.append(session_attempt)
            status = session.status
            self.session_repo.save_session(session)
        else:
            status = SessionStatus.IN_WORK
        return StartedSessionRs(session_status=status)


class FinishSessionUseCaseImpl(FinishSessionUseCase):
    def __init__(self, session_repo: SessionRepo, training_result_calculator: TrainingResultCalculatorService):
        self.session_repo = session_repo
        self.training_result_calculator = training_result_calculator

    def apply(self, request: FinishSessionRq) -> FinishedSessionRs:
        session = self.session_repo.get_session(request.session_uid)
        if session.status == SessionStatus.STARTED:
            session.status = SessionStatus.READY
            current_attempt = session.attempts[-1]
            current_attempt.finished = datetime.now()
            self.session_repo.save_session(session)
        training_result = self.training_result_calculator.calculate(session)
        return FinishedSessionRs(training_result=training_result)
