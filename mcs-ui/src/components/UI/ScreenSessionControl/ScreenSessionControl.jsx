import React, {useEffect, useState} from 'react';
import FormButton from "../FormButton/FormButton";
import Modal from "../Modal/Modal";
import {useDispatch} from "react-redux";
import Requests from "../../../core/constants/requests";
import {useUserInfo} from "../../../hooks/useUserInfo";
import {useScreenSessionId, useTrainingResult} from "../../../hooks/useSession";
import {request} from "../../../hooks/request";

const ScreenSessionControl = () => {
    const sessionId = useScreenSessionId();
    const {fio} = useUserInfo();
    const dispatch = useDispatch();
    const [resultVisible, setResultVisible] = useState(false);
    const trainingResult = useTrainingResult();

    const start = () => {
        console.log("CLICK START");
        request(Requests.START_SESSION, {sessionId}, dispatch)
    }

    const finish = () => {
        console.log("CLICK FINISH");
        request(Requests.FINISH_SESSION, {sessionId}, dispatch)
    }

    useEffect(() => {
        if (trainingResult) {
            setResultVisible(true)
        }
    }, [trainingResult])

    return (
        <div>
            <Modal visible={resultVisible} close={() => setResultVisible(false)}>
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
                    <FormButton label={"Начать"} onClick={start}/>
                </div>
                <div style={{width: "20px"}}/>
                <div style={{width: "150px"}}>
                    <FormButton label={"Завершить"} onClick={finish}/>
                </div>
            </div>
        </div>
    );
};

export default ScreenSessionControl;