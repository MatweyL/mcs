import React, {useEffect, useState} from 'react';
import FormButton from "../FormButton/FormButton";
import {useScreenSessionId} from "../../../hooks/useScreenSessionId";
import Modal from "../Modal/Modal";
import {execute} from "../../../core/store/execute";
import {useDispatch, useSelector} from "react-redux";
import Requests from "../../../core/constants/requests";
import {useUserInfo} from "../../../hooks/useUserInfo";

const ScreenSessionControl = () => {
    const sessionId = useScreenSessionId();
    const {fio} = useUserInfo();
    const dispatch = useDispatch();
    const [resultVisible, setResultVisible] = useState(false);
    const trainingResult = useSelector(state => state.session.trainingResult);

    const start = () => {
        console.log("CLICK START");
        execute(dispatch, {
            meta: {action: {type: Requests.START_SESSION, request: true}},
            payload: {sessionId}
        })
    }

    const finish = () => {
        console.log("CLICK FINISH");
        execute(dispatch, {
            meta: {action: {type: Requests.FINISH_SESSION, request: true}},
            payload: {sessionId}
        })
        // setResultVisible(true);
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