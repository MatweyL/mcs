from datetime import datetime

from service.common.utils import now, from_str_to_datetime
from service.core.session import StartSessionRq, StartedSessionRs, ValidateTrainingSessionRq, ValidateTrainingSessionRs
from service.core.session.repo import SessionRepo
from service.core.session.training import TrainingResultCalculatorService
from service.core.session.training_validator.training_validator import TrainingValidator
from service.core.session.use_case import GetSessionListUseCase, GetSessionListRq, SessionListRs, CreateSessionUseCase, \
    CreateSessionRq, CreatedSessionRs, StartSessionUseCase, FinishSessionUseCase, FinishedSessionRs, FinishSessionRq, \
    ValidateTrainingSessionUseCase
from service.domain.phone import Phone
from service.domain.session import Session, SessionStatus, SessionAttempt


class GetSessionListUseCaseImpl(GetSessionListUseCase):
    def __init__(self, session_repo: SessionRepo):
        self.session_repo = session_repo

    def apply(self, request: GetSessionListRq) -> SessionListRs:
        sessions = self.session_repo.get_sessions(request.user_uid)
        sessions.sort(key=lambda s: from_str_to_datetime(s.date), reverse=True)
        return SessionListRs(sessions=sessions)


class CreateSessionUseCaseImpl(CreateSessionUseCase):

    def __init__(self, session_repo: SessionRepo):
        self.session_repo = session_repo
        self.conversions = {
            "UTK1": "УТК-1",
            "UTK2": "УТК-2",
            "UTK3": "УТК-3",
            "UTK4": "УТК-4",
        }

    def apply(self, request: CreateSessionRq) -> CreatedSessionRs:
        dto = request.session

        session = Session()
        session.user_uid = request.user_uid
        session.date = now()
        # FIXME: оставить только training, подумать о вынесении в отдельную сущность
        session.title = self.conversions.get(dto.training, "Не определено")
        session.training = dto.training
        session.type = dto.type
        session.phone = Phone()
        session.status = SessionStatus.READY

        saved_session = self.session_repo.save_session(session)

        return CreatedSessionRs(session=saved_session)


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
            already_started = False
        else:
            status = SessionStatus.STARTED
            already_started = True
        return StartedSessionRs(session_status=status, already_started=already_started)


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


class ValidateTrainingSessionUseCaseImpl(ValidateTrainingSessionUseCase):
    def __init__(self, session_repo: SessionRepo, training_validator: TrainingValidator):
        self.session_repo = session_repo
        self.training_validator = training_validator

    def apply(self, request: ValidateTrainingSessionRq) -> ValidateTrainingSessionRs:
        session = self.session_repo.get_session(request.session_uid)
        validation_result = self.training_validator.validate(request.screen_code, session)
        return ValidateTrainingSessionRs(order=validation_result.order,
                                         message=validation_result.message,
                                         success=validation_result.is_success)
