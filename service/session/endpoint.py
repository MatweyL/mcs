from service.session.use_case import GetSessionListUseCase, GetSessionListRq


class SessionEndpoint:
    def __init__(self, get_session_list_use_case: GetSessionListUseCase):
        self.get_session_list_use_case = get_session_list_use_case

    def get_sessions(self, request: GetSessionListRq):
        return self.get_session_list_use_case.apply(request)
