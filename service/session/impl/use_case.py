from service.session.repo import SessionRepo
from service.session.use_case import GetSessionListUseCase, GetSessionListRq, SessionListRs


class GetSessionListUseCaseImpl(GetSessionListUseCase):
    def __init__(self, session_repo: SessionRepo):
        self.session_repo = session_repo

    def apply(self, request: GetSessionListRq) -> SessionListRs:
        sessions = self.session_repo.get_sessions(request.user_id)
        return SessionListRs(sessions=sessions)
