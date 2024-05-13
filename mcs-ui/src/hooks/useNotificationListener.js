const webSocketHost = `ws://localhost:8080/ws`;
const socket = new WebSocket(webSocketHost);

export const useNotificationListener = (dispatch) => {
    socket.onmessage = (e) => {
        const eventData = JSON.parse(e.data);
        console.log(eventData);
        dispatch(JSON.parse(eventData));
    }
}

export const sendEvent = (e) => {
    socket.send(e);
}