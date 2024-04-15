import uvicorn
from fastapi import FastAPI, Depends, APIRouter, HTTPException
from starlette.middleware.cors import CORSMiddleware

from service.common.logs import logger
from service.core.auth.auth_context import AuthContext
from service.core.dictionary.use_case import GetDictionaryRq
from service.core.group.use_case import GetUserListByGroupRq
from service.core.screen import GetScreenRq, SaveScreenRq, Screen
from service.core.session import GetSessionListRq, CreateSessionRq, StartSessionRq, FinishSessionRq, SessionRq, \
    ValidateTrainingSessionRq
from service.core.user.use_case import AuthUserRq, RegisterUserRq, LoginUserRq
from service.di import screen_endpoint, user_endpoint, session_endpoint, auth_filter, dictionary_endpoint, \
    group_endpoint

auth_router = APIRouter(dependencies=[Depends(auth_filter.authenticate)])


@auth_router.get('/dictionary')
async def get_dictionary(dictionary_type: str, session_id: str):
    request = GetDictionaryRq(dictionary_type=dictionary_type, session_id=session_id)
    return dictionary_endpoint.get_dictionary(request)


@auth_router.get('/screen')
async def get_screen(screen_name: str, session_id: str, element_id: str = None):
    request = GetScreenRq(screen_name=screen_name, session_id=session_id, uid=element_id)
    return screen_endpoint.get_screen(request)


@auth_router.post('/screen')
async def save_screen(screen: Screen, session_id: str):
    request = SaveScreenRq(session_id=session_id, screen=screen)
    return screen_endpoint.save_screen(request)


@auth_router.post("/register")
async def register_user(request: RegisterUserRq):
    return user_endpoint.register_user(request)


@auth_router.get("/sessions")
async def get_sessions():
    request = GetSessionListRq(user_uid=AuthContext.get_now_user().uid)
    return session_endpoint.get_sessions(request)


@auth_router.post("/session")
async def create_session(session: SessionRq):
    request = CreateSessionRq(user_uid=AuthContext.get_now_user().uid, session=session)
    return session_endpoint.create_session(request)


@auth_router.post("/session/start")
async def start_session(session_uid: str):
    request = StartSessionRq(session_uid=session_uid)
    response = session_endpoint.start_session(request)
    if not response.already_started:
        return response
    else:
        raise HTTPException(status_code=400)


@auth_router.post("/session/finish")
async def start_session(session_uid: str):
    request = FinishSessionRq(session_uid=session_uid)
    return session_endpoint.finish_session(request)


@auth_router.get('/session/training/validate')
async def validate_training_session(session_uid: str, screen_code: str):
    request = ValidateTrainingSessionRq(session_uid=session_uid, screen_code=screen_code)
    return session_endpoint.validate_training_session(request)


not_auth_router = APIRouter()


@not_auth_router.get("/groups")
async def get_groups():
    return group_endpoint.get_groups()


@not_auth_router.get("/users")
async def get_users_by_group(group_uid: str):
    request = GetUserListByGroupRq(group_uid=group_uid)
    return group_endpoint.get_users_by_group(request)


@not_auth_router.post("/test")
async def endpoint_test():
    print('Test endpoint called')


@not_auth_router.post("/auth")
async def auth_user(request: AuthUserRq):
    return user_endpoint.authenticate_user(request)


@not_auth_router.post("/login")
async def auth_user(request: LoginUserRq):
    return user_endpoint.login_user(request)


app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
app.include_router(auth_router)
app.include_router(not_auth_router)

if __name__ == "__main__":
    host = '0.0.0.0'  # TODO: put to config
    port = 8080  # TODO: put to config
    logger.info(f'started http://{host}:{port}/docs')
    uvicorn.run("api:app", host=host, port=port, reload=True)
