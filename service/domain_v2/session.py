from dataclasses import dataclass, field

from service.domain.phone import Phone


@dataclass
class Session:
    uid: str = None
    title: str = None
    date: str = None
    user_uid: str = None
    phone: Phone = None
