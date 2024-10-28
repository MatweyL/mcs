import enum
from dataclasses import dataclass


class Role(str, enum.Enum):
    TEACHER = "TEACHER"
    STUDENT = "STUDENT"


@dataclass
class User:
    uid: str = None
    name: str = None
    surname: str = None
    patronymic: str = None
    group: str = None
    role: Role = None
    password: str = None
