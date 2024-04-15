import enum
from dataclasses import dataclass, field
from datetime import datetime
from typing import List

from service.domain.phone import Phone


class SessionStatus(str, enum.Enum):
    READY = 'READY'
    STARTED = 'STARTED'
    IN_WORK = 'IN_WORK'


class SessionType(str, enum.Enum):
    TRAINING = 'TRAINING'
    EXAM = 'EXAM'
    FREE = 'FREE'


@dataclass
class SessionAttempt:
    started: datetime = None
    finished: datetime = None


class TrainingValue:
    def __init__(self, value, label):
        self.value = value
        self.label = label


class Training(enum.Enum):
    UTK1 = TrainingValue("UTK1", "УТК-1")
    UTK2 = TrainingValue("UTK2", "УТК-2")
    UTK3 = TrainingValue("UTK3", "УТК-3")
    UTK4 = TrainingValue("UTK4", "УТК-4")


@dataclass
class Session:
    active_direction: str = None
    uid: str = None
    title: str = None
    date: str = None
    user_uid: str = None
    phone: Phone = None
    status: SessionStatus = None
    attempts: List[SessionAttempt] = field(default_factory=list)
    training: str = None
    type: SessionType = None
