import React, {useEffect, useRef, useState} from 'react';
import ACTIONS from "../core/socket/actions";
import socket from "../core/socket/socket";
import {useNavigate} from "react-router-dom";
import {v4} from "uuid";
import {RoutePaths} from "../router";
import TextButton from "../components/UI/TextButton/TextButton";

const CallSessionPage = () => {
    const navigate = useNavigate();
    const [rooms, updateRooms] = useState([]);
    const rootNode = useRef();
    const [params, setParams] = useState('')
    const [targetParams, setTargetParams] = useState('')

    useEffect(() => {
        socket.on(ACTIONS.SHARE_ROOMS, ({rooms = []} = {}) => {
            if (rootNode.current) {
                updateRooms(rooms);
            }
        });
    }, []);

    const joinRoom = (roomId, params) => navigate(`${RoutePaths.ROOM}/${roomId}/${params}`);

    const createNewRoom = () => navigate(`${RoutePaths.ROOM}/${v4()}/${params}`);

    const back = () => {
        navigate(RoutePaths.SESSIONS);
    }

    return (
        <div ref={rootNode}>
            <TextButton onClick={back}>← Назад</TextButton>
            <div style={{display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center"}}>
                <h1>Текущие сеансы</h1>

                <div style={{
                    border: "1px solid grey",
                    borderRadius: "5px",
                    padding: " 0 20px 0 20px",
                    display: "flex",
                    justifyContent: "center",
                    flexDirection: "column"
                }}>
                    <div style={{height: "20px"}}></div>
                    <input value={params} onChange={e => setParams(e.target.value)}/>
                    <div style={{height: "20px"}}></div>
                    <button onClick={createNewRoom}>Создать новый сеанс</button>
                    <div style={{height: "20px"}}></div>
                </div>

                <div style={{
                    border: "1px solid grey",
                    borderRadius: "5px",
                    padding: " 0 20px 0 20px",
                    display: "flex",
                    justifyContent: "center",
                    flexDirection: "column"
                }}>
                    <div style={{height: "20px"}}></div>
                    <input value={targetParams} onChange={e => setTargetParams(e.target.value)}/>
                    <div style={{height: "20px"}}></div>
                    <button onClick={() => joinRoom("__", targetParams)}>Открыть по параметрам</button>
                    <div style={{height: "20px"}}></div>
                </div>

                {rooms.map(room => (
                    <div key={room.id} style={{
                        display: "flex",
                        flexDirection: "column",
                        border: "1px solid grey",
                        borderRadius: "5px",
                        padding: " 0 20px 0 20px",
                        marginTop: "20px",
                        fontSize: "12px",
                        cursor: "pointer",
                    }}>
                        <div
                            style={{marginBottom: "20px", marginTop: "10px", display: "flex", flexDirection: "column"}}>
                            <div>ID сеанса: {room.id}</div>
                            <div>Создатель: {room.author}</div>
                            <div>Кол-во участников: {room.clients.length}</div>
                            <div>Параметры подключения: {room.params}</div>
                        </div>
                        <button style={{
                            marginBottom: "10px"
                        }}
                                onClick={() => joinRoom(room.id)}>
                            Присоединиться к текущей комнате
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CallSessionPage;