from abc import abstractmethod
from datetime import datetime
from typing import Optional, Dict, Any

from service.common.utils import from_str_datetime_to_obj
from service.common.utils import now
from service.core.session import StartSessionRq, StartedSessionRs, ValidateTrainingSessionRq, ValidateTrainingSessionRs, \
    FindSessionListWithSameActiveFrequencyRq, FindSessionListWithSameActiveFrequencyRs, GetSessionRq, \
    ActiveDirectionFrequencyRs
from service.core.session.repo import SessionRepo
from service.core.session.training import TrainingResultCalculatorService
from service.core.session.training_validator.training_validator import TrainingValidatorRegistry
from service.core.session.use_case import GetSessionListUseCase, GetSessionListRq, SessionListRs, CreateSessionUseCase, \
    CreateSessionRq, CreatedSessionRs, StartSessionUseCase, FinishSessionUseCase, FinishedSessionRs, FinishSessionRq, \
    ValidateTrainingSessionUseCase, FindSessionListWithSameActiveFrequencyUseCase, GetActiveDirectionBySessionIdUseCase, \
    SessionRq
from service.domain.phone import Phone
from service.domain.session import Session, SessionStatus, SessionAttempt
from service.domain.training import Training, TrainingType
from service.mapper.mapper_dto import SessionDtoMapper


class GetSessionListUseCaseImpl(GetSessionListUseCase):
    def __init__(self,
                 session_repo: SessionRepo,
                 session_dto_mapper: SessionDtoMapper):
        self.session_repo = session_repo
        self.session_dto_mapper = session_dto_mapper

    def apply(self, request: GetSessionListRq) -> SessionListRs:
        sessions = self.session_repo.get_sessions(request.user_uid)
        sessions.sort(key=lambda s: -from_str_datetime_to_obj(s.date).timestamp())

        session_dto_list = [self.session_dto_mapper.map_to_dto(session) for session in sessions]
        return SessionListRs(sessions=session_dto_list)


class GetActiveDirectionBySessionIdUseCaseImpl(GetActiveDirectionBySessionIdUseCase):
    def __init__(self, session_repo: SessionRepo):
        self.session_repo = session_repo

    def apply(self, request: GetSessionRq) -> ActiveDirectionFrequencyRs:
        session = self.session_repo.get_session(request.session_id)
        phone = session.phone
        active_direction = phone.find_active_direction()
        channel = phone.find_channel(active_direction.channel)

        return ActiveDirectionFrequencyRs(frequency=str(channel.frequency))


class TrainingFactory:
    @abstractmethod
    def create(self, training_kind: TrainingType, variant: Optional[Dict[str, Any]]) -> Training:
        pass


class CreateSessionUseCaseImpl(CreateSessionUseCase):

    def __init__(self,
                 session_repo: SessionRepo,
                 training_factory: TrainingFactory,
                 session_dto_mapper: SessionDtoMapper):
        self.session_repo = session_repo
        self.training_factory = training_factory
        self.session_dto_mapper = session_dto_mapper

    def apply(self, request: CreateSessionRq) -> CreatedSessionRs:
        dto = request.session

        session = Session()
        session.user_uid = request.user_uid
        session.date = now()
        if dto.type != 'FREE':
            session.training = self.create_training(dto)
        session.type = dto.type
        session.phone = Phone()
        session.status = SessionStatus.READY
        session.class_uid = request.session.class_uid

        saved_session = self.session_repo.save_session(session)

        session_dto = self.session_dto_mapper.map_to_dto(saved_session)

        return CreatedSessionRs(session=session_dto)

    def create_training(self, dto: SessionRq):
        training_kind = TrainingType.from_name(dto.training)
        return self.training_factory.create(training_kind=training_kind, variant=dto.training_params)


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
