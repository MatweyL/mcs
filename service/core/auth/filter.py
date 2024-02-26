from typing import Annotated

from fastapi import Depends, HTTPException
from fastapi.security import OAuth2PasswordBearer

from service.core.auth.auth_context import AuthContext
from service.common.logs import logger
from service.core.user.repo import UserRepo

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="auth")


class AuthFilter:
    def __init__(self, user_repo: UserRepo):
        self.user_repo = user_repo

    def authenticate(self, token: Annotated[str, Depends(oauth2_scheme)]):
        logger.info(f'Got token {token}')
        user = self.user_repo.get_user_by_uid(token)
        if not user:
            raise HTTPException(
                status_code=401,
                detail="Not authenticated",
                headers={"WWW-Authenticate": "Bearer"},
            )
        logger.info(f'Authenticate user - {user.name}')
        AuthContext.set_user(user)
