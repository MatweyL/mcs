from abc import abstractmethod

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
    username: str
    password: str


class AuthTokenRs(Response):
    token: str


class AuthenticateUserUseCase(UseCase):
    @abstractmethod
    def apply(self, request: AuthUserRq) -> AuthTokenRs:
        pass
