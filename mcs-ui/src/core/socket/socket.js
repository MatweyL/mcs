import {io} from 'socket.io-client';
import {SOCKET_URL} from "../../config/config";
import {token} from "../../API/api";

const options = {
    forceNew: true,
    query: 'token=' + token(),
    timeout: 10000,
    transports: ["websocket"]
}

const socket = io(SOCKET_URL, options);

export const socketNew = () => io(SOCKET_URL, options);

export default socket;