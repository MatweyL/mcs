import hashlib

from service.common.logs import logger
from service.common.mapper import Mapper
from service.core.user.repo import UserRepo
from service.core.user.use_case import RegisterUserUseCase, RegisterUserRq, RegisteredUserRs, AuthenticateUserUseCase, \
    AuthUserRq, AuthResultRs, AuthStatus, LoginUserUseCase, LoginUserRq
from service.domain.user import User


class RegisterUserUseCaseImpl(RegisterUserUseCase):
    def __init__(self, user_repo: UserRepo, mapper: Mapper):
        self.user_repo = user_repo
        self.mapper = mapper

    def apply(self, request: RegisterUserRq) -> RegisteredUserRs:
        user = self.mapper.map(request, User)
        self.user_repo.save_user(user)

        return self.mapper.map(user, RegisteredUserRs)


# FIXME: Пока что AuthenticateUserUseCase и LoginUserUseCase отличаются в реализации лишь тем, что в LoginUserUseCase проверяется пароль
class AuthenticateUserUseCaseImpl(AuthenticateUserUseCase):
    def __init__(self, user_repo: UserRepo):
        self.user_repo = user_repo

    def apply(self, request: AuthUserRq) -> AuthResultRs:
        user = self.user_repo.get_user_by_uid(request.uid)
        if not user:
            return AuthResultRs(status=AuthStatus.NON_AUTHENTICATED)

        fio = f'{user.surname} {user.name[0]}. {user.patronymic[0]}.'
        return AuthResultRs(status=AuthStatus.AUTHENTICATED, token=user.uid, fio=fio, role=user.role)


class LoginUserUseCaseImpl(LoginUserUseCase):
    def __init__(self, user_repo: UserRepo):
        self.user_repo = user_repo

    def apply(self, request: LoginUserRq) -> AuthResultRs:
        user = self.user_repo.get_user_by_uid(request.uid)
        if not user:
            return AuthResultRs(status=AuthStatus.NON_AUTHENTICATED)

        encrypted_password = hashlib.md5(request.password.encode()).hexdigest()
        if encrypted_password != user.password:
            return AuthResultRs(status=AuthStatus.NON_AUTHENTICATED)

        fio = f'{user.surname} {user.name[0]}. {user.patronymic[0]}.'
        return AuthResultRs(status=AuthStatus.AUTHENTICATED, token=user.uid, fio=fio, role=user.role)
