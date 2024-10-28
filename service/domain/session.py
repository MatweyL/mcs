import enum
from dataclasses import dataclass, field
from datetime import datetime
from typing import List, Union

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


class TrainingValues(enum.Enum):
    UTK1 = TrainingValue("UTK1", "УТК-1")
    UTK2 = TrainingValue("UTK2", "УТК-2")
    UTK3 = TrainingValue("UTK3", "УТК-3")
    UTK4 = TrainingValue("UTK4", "УТК-4")


class TrainingType(str, enum.Enum):
    UTK1 = "УТК-1"
    UTK2 = "УТК-2"
    UTK3 = "УТК-3"
    UTK4 = "УТК-4"


@dataclass
class Training:
    kind: str = None
    params: dict[str, Union[float, int, str]] = field(default_factory=dict)


@dataclass
class Session:
    uid: str = None
    title: str = None
    date: str = None
    user_uid: str = None
    phone: Phone = None
    status: SessionStatus = None
    attempts: List[SessionAttempt] = field(default_factory=list)
    training: Training = None
    type: SessionType = None
