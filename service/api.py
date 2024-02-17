import uvicorn
from fastapi import FastAPI, Depends
from starlette.middleware.cors import CORSMiddleware

from service.auth.auth_context import AuthContext
from service.common.logs import logger
from service.di import screen_endpoint, user_endpoint, session_endpoint, auth_filter
from service.schemas.screen import ScreenValues
from service.screen.use_case import GetScreenRq
from service.session.use_case import GetSessionListRq
from service.user.use_case import RegisterUserRq, AuthUserRq

app = FastAPI(dependencies=[Depends(auth_filter.authenticate)])

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get('/dictionary/{dictionary_name}')
async def get_dictionary(dictionary_name: str):  # TODO: обсудить реализацию
    pass


@app.get('/screen')
async def get_screen(screen_name: str, element_uid: str = None):
    request = GetScreenRq(screen_name=screen_name, uid=element_uid)
    return screen_endpoint.get_screen(request)


@app.post('/screen')
async def save_screen(request: ScreenValues):
    return screen_endpoint.save_screen(request)


@app.post("/register")
async def register_user(request: RegisterUserRq):
    return user_endpoint.register_user(request)


@app.post("/test")
async def test():
    print('Test endpoint called')


@app.post("/auth")
async def auth_user(request: AuthUserRq):
    return user_endpoint.authenticate_user(request)


@app.get("/sessions")
async def get_sessions():
    request = GetSessionListRq(user_id=AuthContext.get_now_user().uid)
    return session_endpoint.get_sessions(request)


if __name__ == "__main__":
    host = 'localhost'  # TODO: put to config
    port = 8080  # TODO: put to config
    logger.info(f'started http://{host}:{port}/docs')
    uvicorn.run(app, host=host, port=port)
