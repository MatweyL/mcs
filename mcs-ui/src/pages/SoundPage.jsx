import React from 'react';
import {sendEvent, useNotificationListener} from "../hooks/useNotificationListener";
import {useDispatch} from "react-redux";

const SoundPage = () => {
    const dispatch = useDispatch();

    useNotificationListener(dispatch)

    const fire = () => {
        sendEvent(JSON.stringify({'data': 'data'}));
    }

    return (
        <div>
            Страница для тестирования получения аудио
            <button onClick={fire} >Fire event</button>
        </div>
    );
};

export default SoundPage;