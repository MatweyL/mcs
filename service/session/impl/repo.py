from typing import List

from service.common.mapper import Mapper
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
