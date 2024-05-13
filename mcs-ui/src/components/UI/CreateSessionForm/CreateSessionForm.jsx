import React, {useEffect, useState} from 'react';
import Modal from "../Modal/Modal";
import Requests from "../../../core/constants/requests";
import {useDispatch} from "react-redux";
import FieldSelectbox from "../FieldSelectbox/FieldSelectbox";
import FormButton from "../FormButton/FormButton";
import {SessionTypes} from "../../../core/constants/session_types";
import {request} from "../../../hooks/request";

const devices = [
    {value: "AZART", label: "Азарт Р-187"}
]
const trainings = [
    {value: "", label: ""},
    {value: "UTK1", label: "УТК-1. Включение питания"},
    {value: "UTK2", label: "УТК-2. Настройка частоты в режиме ЧМ25"},
    {value: "UTK3", label: "УТК-3. Настройка частоты в режиме ЧМ50"},
    {value: "UTK4", label: "УТК-4. Настройка частоты в режиме ППРЧ"},
]

const types = [
    {value: "", label: ""},
    {value: SessionTypes.TRAINING, label: "Тренировка"},
    {value: SessionTypes.EXAM, label: "Экзамен"},
    {value: SessionTypes.FREE, label: "Свободный"},
]

const CreateSessionForm = ({visible, setVisible}) => {
    const dispatch = useDispatch();
    const [session, setSession] = useState({training: "", type: ""})
    const [enabled, enableButton] = useState(false)

    const createSession = () => {
        if (session && enabled) {
            console.log(session)
            request(Requests.CREATE_SESSION, {session}, dispatch);
            setVisible(false);
        }
    }

    useEffect(() => {
        if (session.training && session.type) {
            enableButton(true);
        } else {
            enableButton(false);
        }
    }, [session]);

    return (
        <Modal visible={visible} close={() => setVisible(false)}>
            <FieldSelectbox title={"Устройство"} options={devices}/>
            <FieldSelectbox title={"УТК"} options={trainings}
                            onChange={e => setSession({...session, training: e.target.value})}/>
            <FieldSelectbox title={"Тип"} options={types}
                            onChange={e => setSession({...session, type: e.target.value})}/>
            <div style={{marginTop: "20px"}}>
                <FormButton onClick={createSession} label={"Создать сессию"} enabled={enabled}/>
            </div>
        </Modal>
    );
};

export default CreateSessionForm;