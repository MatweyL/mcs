from service.common.utils import now
from service.domain.phone import Phone
from service.domain.session import Session
from service.core.session.repo import SessionRepo
from service.core.session.use_case import GetSessionListUseCase, GetSessionListRq, SessionListRs, CreateSessionUseCase, \
    CreateSessionRq, CreatedSessionRs


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
