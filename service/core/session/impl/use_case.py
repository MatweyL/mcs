from datetime import datetime

from service.common.utils import from_str_datetime_to_obj
from service.common.utils import now
from service.core.session import StartSessionRq, StartedSessionRs, ValidateTrainingSessionRq, ValidateTrainingSessionRs, \
    FindSessionListWithSameActiveFrequencyRq, FindSessionListWithSameActiveFrequencyRs, GetSessionRq, ActiveDirectionFrequencyRs
from service.core.session.repo import SessionRepo
from service.core.session.training import TrainingResultCalculatorService
from service.core.session.training_validator.training_validator import TrainingValidatorRegistry
from service.core.session.use_case import GetSessionListUseCase, GetSessionListRq, SessionListRs, CreateSessionUseCase, \
    CreateSessionRq, CreatedSessionRs, StartSessionUseCase, FinishSessionUseCase, FinishedSessionRs, FinishSessionRq, \
    ValidateTrainingSessionUseCase, FindSessionListWithSameActiveFrequencyUseCase, GetActiveDirectionBySessionIdUseCase
from service.domain.phone import Phone
from service.domain.session import Session, SessionStatus, SessionAttempt


class GetSessionListUseCaseImpl(GetSessionListUseCase):
    def __init__(self, session_repo: SessionRepo):
        self.session_repo = session_repo

    def apply(self, request: GetSessionListRq) -> SessionListRs:
        sessions = self.session_repo.get_sessions(request.user_uid)
        sessions.sort(key=lambda s: -from_str_datetime_to_obj(s.date).timestamp())

        return SessionListRs(sessions=sessions)


class GetActiveDirectionBySessionIdUseCaseImpl(GetActiveDirectionBySessionIdUseCase):
    def __init__(self, session_repo: SessionRepo):
        self.session_repo = session_repo

    def apply(self, request: GetSessionRq) -> ActiveDirectionFrequencyRs:
        session = self.session_repo.get_session(request.session_id)
        phone = session.phone
        active_direction = phone.find_active_direction()
        channel = phone.find_channel(active_direction.channel)

        return ActiveDirectionFrequencyRs(frequency=str(channel.frequency))


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
    def __init__(self, session_repo: SessionRepo, training_validator_registry: TrainingValidatorRegistry):
        self.session_repo = session_repo
        self.training_validator_registry = training_validator_registry

    def apply(self, request: ValidateTrainingSessionRq) -> ValidateTrainingSessionRs:
        session = self.session_repo.get_session(request.session_uid)
        validation_result = self.training_validator_registry.validate(request.screen_code, session)
        return ValidateTrainingSessionRs(order=validation_result.order,
                                         message=validation_result.message,
                                         success=validation_result.is_success)


class FindSessionListWithSameActiveFrequencyUseCaseImpl(FindSessionListWithSameActiveFrequencyUseCase):
    def __init__(self, session_repo: SessionRepo):
        self.session_repo = session_repo

    def apply(self, request: FindSessionListWithSameActiveFrequencyRq) -> FindSessionListWithSameActiveFrequencyRs:
        request_session = self.session_repo.get_session(request.session_uid)
        if not request_session.phone.active_direction:
            return []
        sessions = self.session_repo.get_all_sessions()
        found_sessions = []
        for session in sessions:
            if request_session.phone.active_direction == session.phone.active_direction:
                found_sessions.append(session)
        return found_sessions
