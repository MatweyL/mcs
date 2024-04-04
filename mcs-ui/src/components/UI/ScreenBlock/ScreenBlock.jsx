import React from 'react';
import {SessionStatus} from "../../../core/constants/session_status";
import {useSession} from "../../../hooks/useSession";
import {SessionTypes} from "../../../core/constants/session_types";

const ScreenBlock = () => {
    const {status, type} = useSession();

    const isBlocked = () => {
        return status !== SessionStatus.STARTED
            && type !== SessionTypes.FREE;
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