from service.common.logs import logger
from service.core.session.use_case import GetSessionListUseCase, GetSessionListRq, CreateSessionUseCase, \
    CreateSessionRq, \
    CreatedSessionRs, SessionListRs, StartSessionRq, FinishSessionRq, StartSessionUseCase, FinishSessionUseCase, \
    StartedSessionRs, FinishedSessionRs, ValidateTrainingSessionRq, ValidateTrainingSessionRs, \
    ValidateTrainingSessionUseCase


class SessionEndpoint:
    def __init__(self,
                 get_session_list_use_case: GetSessionListUseCase,
                 create_session_use_case: CreateSessionUseCase,
                 start_session_use_case: StartSessionUseCase,
                 finish_session_use_case: FinishSessionUseCase,
                 validate_training_session_use_case: ValidateTrainingSessionUseCase):
        self.get_session_list_use_case = get_session_list_use_case
        self.create_session_use_case = create_session_use_case
        self.start_session_use_case = start_session_use_case
        self.finish_session_use_case = finish_session_use_case
        self.validate_training_session_use_case = validate_training_session_use_case

    def get_sessions(self, request: GetSessionListRq) -> SessionListRs:
        try:
            return self.get_session_list_use_case.apply(request)
        except BaseException as e:
            logger.exception(e)
            raise e
    def create_session(self, request: CreateSessionRq) -> CreatedSessionRs:
        return self.create_session_use_case.apply(request)

    def start_session(self, request: StartSessionRq) -> StartedSessionRs:
        return self.start_session_use_case.apply(request)

    def finish_session(self, request: FinishSessionRq) -> FinishedSessionRs:
        return self.finish_session_use_case.apply(request)

    def validate_training_session(self, request: ValidateTrainingSessionRq) -> ValidateTrainingSessionRs:
        return self.validate_training_session_use_case.apply(request)
