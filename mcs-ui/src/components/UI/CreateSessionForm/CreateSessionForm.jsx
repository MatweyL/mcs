import React, {useEffect, useState} from 'react';
import Modal from "../Modal/Modal";
import Requests from "../../../core/constants/requests";
import {useDispatch} from "react-redux";
import FieldSelectbox from "../FieldSelectbox/FieldSelectbox";
import FormButton from "../FormButton/FormButton";
import {SessionTypes} from "../../../core/constants/session_types";
import {request} from "../../../hooks/request";
import {fetchDevices, fetchTrainingTypes} from "../../../API/fetchers";
import {EMPTY_OPTION} from "../../../core/constants/ui";


const types = [
    {value: "", label: ""},
    {value: SessionTypes.TRAINING, label: "Тренировка"},
    // У студента нет возможности создать экзамен, он создается автоматически
    // {value: SessionTypes.EXAM, label: "Экзамен"},
    {value: SessionTypes.FREE, label: "Свободный"},
]

const CreateSessionForm = ({visible, setVisible}) => {
    const dispatch = useDispatch();
    const [session, setSession] = useState({training: "", type: ""})
    const [enabled, enableButton] = useState(false)

    const [devices, setDevices] = useState([]);
    const [nowDevice, setNowDevice] = useState('');

    const [kinds, setKinds] = useState([]);

    useEffect(() => {
        fetchDevices().then(devices => {
            setDevices(devices);
            setNowDevice(devices[0].value);
        })
    }, []);

    useEffect(() => {
        if (session.type === SessionTypes.TRAINING) {
            setKinds([]);
            setSession({...session, training: null})
        }

        if (nowDevice && session.type === SessionTypes.TRAINING) {
            fetchTrainingTypes(nowDevice).then(kinds => setKinds([EMPTY_OPTION, ...kinds]))
        }
    }, [nowDevice, session.type])

    const createSession = () => {
        if (session && enabled) {
            console.log(session)
            request(Requests.CREATE_SESSION, {session}, dispatch);
            setVisible(false);
        }
    }

    useEffect(() => {
        if (session.type === SessionTypes.FREE) {
            enableButton(true)
            return;
        }

        if (session.training && session.type) {
            enableButton(true);
        } else {
            enableButton(false);
        }
    }, [session]);

    return (
        <Modal visible={visible} close={() => setVisible(false)}>
            <FieldSelectbox title={"Устройство"} options={devices}
                            onChange={e => setNowDevice(e.target.value)}/>
            <FieldSelectbox title={"Тип"} options={types}
                            onChange={e => setSession({...session, type: e.target.value})}/>
            {session.type === SessionTypes.TRAINING &&
                <FieldSelectbox title={"УТК"} options={kinds}
                                onChange={e => setSession({...session, training: e.target.value})}/>
            }
            <div style={{marginTop: "20px"}}>
                <FormButton onClick={createSession} label={"Создать сессию"} enabled={enabled}/>
            </div>
        </Modal>
    );
};

export default CreateSessionForm;