from service.core.session.use_case import GetSessionListUseCase, GetSessionListRq, CreateSessionUseCase, \
    CreateSessionRq, \
    CreatedSessionRs, SessionListRs


class SessionEndpoint:
    def __init__(self,
                 get_session_list_use_case: GetSessionListUseCase,
                 create_session_use_case: CreateSessionUseCase):
        self.get_session_list_use_case = get_session_list_use_case
        self.create_session_use_case = create_session_use_case

    def get_sessions(self, request: GetSessionListRq) -> SessionListRs:
        return self.get_session_list_use_case.apply(request)

    def create_session(self, request: CreateSessionRq) -> CreatedSessionRs:
        return self.create_session_use_case.apply(request)
