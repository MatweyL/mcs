from service.common.logs import logger
from service.core.user.use_case import RegisterUserRq, RegisterUserUseCase, AuthenticateUserUseCase, AuthUserRq, \
    LoginUserUseCase, LoginUserRq


class UserEndpoint:
    def __init__(self,
                 register_user_use_case: RegisterUserUseCase,
                 authenticate_user_use_case: AuthenticateUserUseCase,
                 login_user_use_case: LoginUserUseCase):
        self.register_user_use_case = register_user_use_case
        self.authenticate_user_use_case = authenticate_user_use_case
        self.login_user_use_case = login_user_use_case

    def register_user(self, request: RegisterUserRq):
        try:
            return self.register_user_use_case.apply(request)
        except BaseException as e:
            logger.exception(e)

    def authenticate_user(self, request: AuthUserRq):
        try:
            return self.authenticate_user_use_case.apply(request)
        except BaseException as e:
            logger.exception(e)
            return 401

    def login_user(self, request: LoginUserRq):
        try:
            return self.login_user_use_case.apply(request)
        except BaseException as e:
            logger.exception(e)
            return 401
