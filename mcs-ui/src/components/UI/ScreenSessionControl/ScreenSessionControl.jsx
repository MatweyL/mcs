import React, {useEffect, useState} from 'react';
import FormButton from "../FormButton/FormButton";
import Modal from "../Modal/Modal";
import {useDispatch} from "react-redux";
import Requests from "../../../core/constants/requests";
import {useUserInfo} from "../../../hooks/useUserInfo";
import {useSession} from "../../../hooks/useSession";
import {request} from "../../../hooks/request";
import {SessionStatus} from "../../../core/constants/session_status";
import {action} from "../../../hooks/action";
import Actions from "../../../core/constants/actions";

const ScreenSessionControl = () => {
    const {fio} = useUserInfo();
    const dispatch = useDispatch();
    const [resultVisible, setResultVisible] = useState(false);

    const {trainingResult, sessionId, status} = useSession();

    const [enabledStartButton, enableStart] = useState(false);

    const start = () => {
        if (enabledStartButton) {
            console.log("CLICK START");
            request(Requests.START_SESSION, {sessionId}, dispatch)
        }
    }

    const finish = () => {
        if (!enabledStartButton) {
            console.log("CLICK FINISH");
            request(Requests.FINISH_SESSION, {sessionId}, dispatch)
        }
    }

    const close = () => {
        setResultVisible(false);
        action(Actions.RESET_TRAINING_RESULT, {}, dispatch);
    }

    useEffect(() => {
        if (trainingResult) {
            setResultVisible(true);
        }
    }, [trainingResult]);

    useEffect(() => {
        if (status === SessionStatus.READY) {
            enableStart(true);
        } else {
            enableStart(false);
        }
    }, [status]);

    return (
        <div>
            <Modal visible={resultVisible} close={close}>
                Выполнение УТК завершено
                <div>
                    Студент: {fio}
                </div>
                <div>
                    Оценка: {trainingResult?.mark}
                </div>
                <div>
                    Результат: {trainingResult?.duration} сек
                </div>
                <div>
                    Попытка: {trainingResult?.attempt}
                </div>
            </Modal>
            <div style={{
                height: "100px",
                display: "flex",
                flexDirection: "row",
                justifyContent: "start",
                marginBottom: "100px"
            }}>
                <div style={{width: "150px"}}>
                    <FormButton label={"Начать"} onClick={start} enabled={enabledStartButton}/>
                </div>
                <div style={{width: "20px"}}/>
                <div style={{width: "150px"}}>
                    <FormButton label={"Завершить"} onClick={finish} enabled={!enabledStartButton}/>
                </div>
            </div>
        </div>
    );
};

export default ScreenSessionControl;