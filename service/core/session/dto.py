from dataclasses import dataclass, field
from typing import List

from service.domain.phone import Phone
from service.domain.session import SessionStatus, SessionAttempt, SessionType
from service.domain.training import Training


@dataclass
class SessionDto:
    uid: str = None
    title: str = None
    date: str = None
    user_uid: str = None
    phone: Phone = None
    status: SessionStatus = None
    attempts: List[SessionAttempt] = field(default_factory=list)
    training: Training = None
    type: SessionType = None
