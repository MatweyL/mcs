import enum
from dataclasses import dataclass, field
from datetime import datetime
from typing import List

from service.domain.phone import Phone


class SessionStatus(str, enum.Enum):
    READY = 'READY'
    STARTED = 'STARTED'
    IN_WORK = 'IN_WORK'


@dataclass
class SessionAttempt:
    started: datetime = None
    finished: datetime = None


@dataclass
class Session:
    uid: str = None
    title: str = None
    date: str = None
    user_uid: str = None
    phone: Phone = None
    status: SessionStatus = None
    attempts: List[SessionAttempt] = field(default_factory=list)
    training: str = None
