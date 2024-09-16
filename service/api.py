from typing import Dict

import socketio
import uvicorn
from fastapi import FastAPI, Depends, APIRouter, HTTPException
from starlette.middleware.cors import CORSMiddleware

from service.common.logs import logger
from service.core.auth.auth_context import AuthContext
from service.core.dictionary.use_case import GetDictionaryRq
from service.core.group.use_case import GetUserListByGroupRq
from service.core.screen import GetScreenRq, SaveScreenRq, Screen
from service.core.session import GetSessionListRq, CreateSessionRq, StartSessionRq, FinishSessionRq, SessionRq, \
    ValidateTrainingSessionRq, GetSessionRq, ActiveDirectionFrequencyRs
from service.core.user.use_case import AuthUserRq, RegisterUserRq, LoginUserRq
from service.di import screen_endpoint, user_endpoint, session_endpoint, auth_filter, dictionary_endpoint, \
    group_endpoint
from service.domain.direction import Direction
from service.domain.room import Room

auth_router = APIRouter(dependencies=[Depends(auth_filter.authenticate)])


@auth_router.get('/dictionary')
async def get_dictionary(dictionary_type: str, session_id: str):
    request = GetDictionaryRq(dictionary_type=dictionary_type, session_id=session_id)
    return dictionary_endpoint.get_dictionary(request)


@auth_router.get('/screen')
async def get_screen(screen_name: str, session_id: str, element_id: str = None):
    logger.info(f'SESSION ID: {session_id}')
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

sio = socketio.AsyncServer(async_mode='asgi', cors_allowed_origins='*')
socketio_app = socketio.ASGIApp(socketio_server=sio, socketio_path='/')
app.mount('/', socketio_app)
app.sio = sio

joined_rooms: Dict[str, Room] = {}


@app.sio.event
async def connect(sid, environ, auth):
    logger.info(environ)
    logger.info(auth)
    logger.info(f'connect {sid}')
    await share_rooms_info()


async def share_rooms_info():
    await app.sio.emit('share-rooms', {'rooms': get_client_rooms()})


def get_client_rooms():
    rooms = []
    for room_id, room in joined_rooms.items():
        rooms.append({"id": room_id, "author": room.author_name, "clients": room.clients, "params": room.params})

    return rooms


@app.sio.event
async def disconnect(sid):
    logger.info(f'{sid} disconnect')
    await leave_room(sid)


@app.sio.on("join")
async def on_join(sid, *args):
    logger.info(f"{sid} joined")
    logger.info(args)

    room_id = args[0].get('room', None)
    params = args[0].get('params', None)
    session_id = args[0].get('sessionId', None)
    rooms = app.sio.rooms(sid)

    logger.info(joined_rooms)
    logger.info(rooms)

    room: Room = None
    # Если передан sessionId - ищем params по сессии
    if session_id:
        request = GetSessionRq(session_id=session_id)
        response: ActiveDirectionFrequencyRs = session_endpoint.get_active_direction_by_session_id(request)
        params = response.frequency
        logger.info(f'Get active_direction params - {params}')
    # Если передан room_id - создаем комнату или ищем по id
    if len(room_id) == 36:
        room = joined_rooms.get(room_id, None)
        if room is None:
            room = Room(sid, sid, [], params)
    # Иначе - ищем комнату по params
    else:
        for check_room in joined_rooms.values():
            if check_room.params == params:
                logger.info(f'Found room by params - {params}')
                room = check_room

    if room is None:
        logger.error(f'Not found rooms by params: {args}')
        room = Room(sid, sid, [], params)

    if sid in room.clients:
        return f'Already joined includes {room_id}'

    for client_id in room.clients:
        await app.sio.emit('add-peer', {'peerID': sid, 'createOffer': False}, client_id)
        await app.sio.emit('add-peer', {'peerID': client_id, 'createOffer': True}, sid)

    room.clients.append(sid)
    joined_rooms[room_id] = room

    await app.sio.enter_room(sid, room_id)
    await share_rooms_info()


@app.sio.on("leave")
async def on_leave(sid, *args, **kwargs):
    logger.info(f"{sid} leave")
    await leave_room(sid)


async def leave_room(sid):
    target_clients = []
    target_room_id = None
    for room_id in joined_rooms.keys():
        room: Room = joined_rooms[room_id]
        if sid in room.clients:
            target_clients = room.clients
            target_room_id = room_id
            break

    for client_id in target_clients:
        await app.sio.emit('remove-peer', {'peerID': sid}, client_id)
        await app.sio.emit('remove-peer', {'peerID': client_id}, sid)

    await app.sio.leave_room(sid, target_room_id)
    joined_rooms.pop(target_room_id)
    logger.info(joined_rooms)

    await share_rooms_info()


@app.sio.on("relay-sdp")
async def on_relay_sdp(sid, *args):
    logger.info(f"{sid} relay sdp")
    logger.info(args)

    peer_id = args[0]['peerID']
    session_description = args[0]['sessionDescription']

    raw_data = {'peerID': sid, 'sessionDescription': session_description}
    await app.sio.emit('session-description', raw_data, peer_id)


@app.sio.on("relay-ice")
async def on_relay_ice(sid, *args):
    logger.info(f"{sid} relay ice")
    logger.info(args)

    peer_id = args[0]['peerID']
    ice_candidate = args[0]['iceCandidate']

    raw_data = {'peerID': sid, 'iceCandidate': ice_candidate}
    await app.sio.emit('ice-candidate', raw_data, peer_id)

WITH_HTTPS = True

if __name__ == "__main__":
    host = '0.0.0.0'  # TODO: put to config
    port = 8080  # TODO: put to config
    if WITH_HTTPS:
        logger.info(f'started https://{host}:{port}/docs')
        uvicorn.run("api:app", host=host, port=port, reload=True, ssl_keyfile='key.pem', ssl_certfile='cert.pem')
    else:
        logger.info(f'started http://{host}:{port}/docs')
        uvicorn.run("api:app", host=host, port=port, reload=True)
