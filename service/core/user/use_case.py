from abc import abstractmethod
from enum import Enum

from service.core.use_case import UseCase, Request, Response


class RegisterUserRq(Request):
    name: str
    surname: str
    patronymic: str
    group: str
    password: str


class RegisteredUserRs(Response):
    name: str
    surname: str
    patronymic: str
    group: str
    password: str


class RegisterUserUseCase(UseCase):
    @abstractmethod
    def apply(self, request: RegisterUserRq) -> RegisteredUserRs:
        pass


class AuthUserRq(Request):
    uid: str


class AuthStatus(Enum):
    AUTHENTICATED = 'AUTHENTICATED'
    NON_AUTHENTICATED = 'NON_AUTHENTICATED'


class AuthResultRs(Response):
    def __init__(self,
                 status: AuthStatus,
                 fio: str | None = None,
                 token: str | None = None) -> None:
        self.status = status
        self.token = token
        self.fio = fio


class AuthenticateUserUseCase(UseCase):
    @abstractmethod
    def apply(self, request: AuthUserRq) -> AuthResultRs:
        pass


class LoginUserRq(Request):
    uid: str
    password: str


class LoginUserUseCase(UseCase):
    @abstractmethod
    def apply(self, request: LoginUserRq) -> AuthResultRs:
        pass
