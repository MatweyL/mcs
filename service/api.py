import uvicorn
from fastapi import FastAPI, Depends
from starlette.middleware.cors import CORSMiddleware

from service.common.logs import logger
from service.core.auth.auth_context import AuthContext
from service.core.dictionary.use_case import GetDictionaryRq
from service.core.screen import GetScreenRq, SaveScreenRq, Screen
from service.core.session import GetSessionListRq, CreateSessionRq
from service.core.user.use_case import AuthUserRq, RegisterUserRq
from service.di import screen_endpoint, user_endpoint, session_endpoint, auth_filter, dictionary_endpoint

app = FastAPI(dependencies=[Depends(auth_filter.authenticate)])

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get('/dictionary')
async def get_dictionary(dictionary_type: str, session_id: str):
    request = GetDictionaryRq(dictionary_type=dictionary_type, session_id=session_id)
    return dictionary_endpoint.get_dictionary(request)


@app.get('/screen')
async def get_screen(screen_name: str, session_id: str, element_id: str = None):
    request = GetScreenRq(screen_name=screen_name, session_id=session_id, uid=element_id)
    return screen_endpoint.get_screen(request)


@app.post('/screen')
async def save_screen(screen: Screen, session_id: str):
    request = SaveScreenRq(session_id=session_id, screen=screen)
    return screen_endpoint.save_screen(request)


@app.post("/register")
async def register_user(request: RegisterUserRq):
    return user_endpoint.register_user(request)


@app.post("/test")
async def endpoint_test():
    print('Test endpoint called')


@app.post("/auth")
async def auth_user(request: AuthUserRq):
    return user_endpoint.authenticate_user(request)


@app.get("/sessions")
async def get_sessions():
    request = GetSessionListRq(user_uid=AuthContext.get_now_user().uid)
    return session_endpoint.get_sessions(request)


@app.post("/session")
async def create_session():
    request = CreateSessionRq(user_uid=AuthContext.get_now_user().uid)
    return session_endpoint.create_session(request)



if __name__ == "__main__":
    host = 'localhost'  # TODO: put to config
    port = 8080  # TODO: put to config
    logger.info(f'started http://{host}:{port}/docs')
    uvicorn.run(app, host=host, port=port)
