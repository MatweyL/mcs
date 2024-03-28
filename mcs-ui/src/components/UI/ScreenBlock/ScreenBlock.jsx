import React from 'react';
import {SessionStatus} from "../../../core/constants/session_status";
import {useSession} from "../../../hooks/useSession";

const ScreenBlock = () => {
    const {status} = useSession();

    const isBlocked = () => {
        console.log(status);
        return status !== SessionStatus.STARTED;
    }

    return (
        isBlocked()
            ? <div className="blur">
                <div className="blur-alert">Нажмите "Начать" для разблокировки устройства</div>
            </div>
            : null
    );
};

export default ScreenBlock;