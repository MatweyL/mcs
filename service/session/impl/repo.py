from typing import List

from service.common.mapper import Mapper
from service.common.utils import generate_uid
from service.db.db import JsonDb
from service.session.models import Session
from service.session.repo import SessionRepo


class InMemorySessionRepo(SessionRepo):

    def __init__(self,
                 db: JsonDb,
                 mapper: Mapper):
        self.db = db
        self.mapper = mapper

    def get_sessions(self, user_uid: str) -> List[Session]:
        json = self.db.get_json()
        sessions = json['sessions']
        user_sessions = filter(lambda s: s['user_uid'] == user_uid, sessions)
        return list(map(lambda s: self.mapper.map(s, Session), user_sessions))

    def save_session(self, session: Session) -> Session:
        if not session.uid:
            session.uid = generate_uid()

        json = self.db.get_json()
        sessions = json['sessions']
        uid = session.uid
        index = next((i for i, s in enumerate(sessions) if s.get('uid', None) == uid), None)

        session_json = self.mapper.map(session, dict)
        if index:
            sessions[index] = session_json
        else:
            sessions.append(session_json)

        self.db.save_json(json)

        return session
