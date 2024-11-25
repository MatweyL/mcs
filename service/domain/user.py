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

    @property
    def fio(self) -> str:
        if not self.patronymic:
            return f"{self.surname} {self.name}"
        return f"{self.surname} {self.name} {self.patronymic}"

    def __hash__(self):
        return hash(self.uid)

    def __eq__(self, other):
        return isinstance(other, User) and self.uid == other.uid
