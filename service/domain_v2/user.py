from dataclasses import dataclass


@dataclass
class User:
    uid: str = None
    name: str = None
    surname: str = None
    patronymic: str = None
    group: str = None
    password: str = None
