from typing import List

from service.common.logs import logger
from service.common.utils import generate_uid, from_str_datetime_to_obj
from service.core.session.repo import SessionRepo
from service.db.db import JsonDb
from service.domain.session import Session
from service.mapper.mapper import SessionMapper


class InMemorySessionRepo(SessionRepo):

    def __init__(self,
                 db: JsonDb,
                 mapper: SessionMapper):
        self.db = db
        self.mapper = mapper

    def get_sessions(self, user_uid: str) -> List[Session]:
        json = self.db.get_json()
        sessions = json['sessions']
        user_sessions = filter(lambda s: s['user_uid'] == user_uid, sessions)
        sessions_models = [self.mapper.map_to_domain(s) for s in user_sessions]
        return sessions_models

    def save_session(self, session: Session) -> Session:
        """
        доменный объект на вход
        в методе получаем entity из хранилища
        работаем в методе с entity
        на выходе - доменный объект
        :param session:
        :return:
        """
        logger.info(session)
        if not session.uid:
            session.uid = generate_uid()

        json = self.db.get_json()
        sessions = json['sessions']
        uid = session.uid
        index = next((i for i, s in enumerate(sessions) if s.get('uid', None) == uid), None)

        session_json = self.mapper.map_to_entity(session)
        if index is not None:
            sessions[index] = session_json
        else:
            sessions.append(session_json)

        self.db.save_json(json)

        return session

    def get_session(self, session_id: str) -> Session:
        json = self.db.get_json()
        sessions = json['sessions']
        session = next(filter(lambda s: s['uid'] == session_id, sessions), None)

        return self.mapper.map_to_domain(session)

    def get_all_sessions(self) -> List[Session]:
        json = self.db.get_json()
        sessions = json['sessions']
        return [self.mapper.map_to_domain(session) for session in sessions]
