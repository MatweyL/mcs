import React, {useEffect, useRef, useState} from 'react';
import ACTIONS from "../core/socket/actions";
import socket from "../core/socket/socket";
import {useNavigate} from "react-router-dom";
import {v4} from "uuid";
import {RoutePaths} from "../router";

const CallSessionPage = () => {
    const navigate = useNavigate();
    const [rooms, updateRooms] = useState([]);
    const rootNode = useRef();

    useEffect(() => {
        socket.on(ACTIONS.SHARE_ROOMS, ({rooms = []} = {}) => {
            if (rootNode.current) {
                updateRooms(rooms);
            }
        });
    }, []);

    const joinRoom = (roomId) => navigate(`${RoutePaths.ROOM}/${roomId}`);

    const createNewRoom = () => navigate(`${RoutePaths.ROOM}/${v4()}`);

    return (
        <div ref={rootNode}>
            <div style={{display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center"}}>
                <h1>Текущие сеансы</h1>

                {rooms.map(roomID => (
                    <div key={roomID} style={{
                        display: "flex",
                        flexDirection: "column",
                        border: "1px solid grey",
                        borderRadius: "5px",
                        padding:" 0 20px 0 20px",
                        marginTop: "20px",
                        fontSize: "12px",
                        cursor: "pointer",
                    }}>
                        <div style={{marginBottom: "20px", marginTop: "10px"}}>
                            ID сеанса: {roomID}
                        </div>
                        <button style={{
                            marginBottom: "10px"
                        }}
                            onClick={() => joinRoom(roomID)}>
                            Присоединиться
                        </button>
                    </div>
                ))}

                <div style={{height: "20px"}}></div>
                <button onClick={createNewRoom}>Создать новый сеанс</button>
            </div>
        </div>
    );
};

export default CallSessionPage;