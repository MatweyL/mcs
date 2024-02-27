from service.common.mapper import Mapper
from service.common.utils import generate_uid
from service.core.user.repo import UserRepo
from service.core.user.use_case import RegisterUserUseCase, RegisterUserRq, RegisteredUserRs, AuthenticateUserUseCase, \
    AuthUserRq, AuthTokenRs
from service.domain.user import User


class RegisterUserUseCaseImpl(RegisterUserUseCase):
    def __init__(self, user_repo: UserRepo, mapper: Mapper):
        self.user_repo = user_repo
        self.mapper = mapper

    def apply(self, request: RegisterUserRq) -> RegisteredUserRs:
        user = self.mapper.map(request, User)
        self.user_repo.save_user(user)

        return self.mapper.map(user, RegisteredUserRs)


class AuthenticateUserUseCaseImpl(AuthenticateUserUseCase):
    def __init__(self, user_repo: UserRepo):
        self.user_repo = user_repo

    def apply(self, request: AuthUserRq) -> AuthTokenRs:
        user = self.user_repo.get_user(request.username)
        if not user:
            raise Exception()

        return AuthTokenRs(token=generate_uid())
