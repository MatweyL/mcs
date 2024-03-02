from service.core.session.use_case import GetSessionListUseCase, GetSessionListRq, CreateSessionUseCase, \
    CreateSessionRq, \
    CreatedSessionRs, SessionListRs, StartSessionRq, FinishSessionRq, StartSessionUseCase, FinishSessionUseCase, \
    StartedSessionRs, FinishedSessionRs


class SessionEndpoint:
    def __init__(self,
                 get_session_list_use_case: GetSessionListUseCase,
                 create_session_use_case: CreateSessionUseCase,
                 start_session_use_case: StartSessionUseCase,
                 finish_session_use_case: FinishSessionUseCase,):
        self.get_session_list_use_case = get_session_list_use_case
        self.create_session_use_case = create_session_use_case
        self.start_session_use_case = start_session_use_case
        self.finish_session_use_case = finish_session_use_case

    def get_sessions(self, request: GetSessionListRq) -> SessionListRs:
        return self.get_session_list_use_case.apply(request)

    def create_session(self, request: CreateSessionRq) -> CreatedSessionRs:
        return self.create_session_use_case.apply(request)

    def start_session(self, request: StartSessionRq) -> StartedSessionRs:
        return self.start_session_use_case.apply(request)

    def finish_session(self, request: FinishSessionRq) -> FinishedSessionRs:
        return self.finish_session_use_case.apply(request)
