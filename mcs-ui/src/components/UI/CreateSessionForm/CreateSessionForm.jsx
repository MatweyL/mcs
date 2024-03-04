import React, {useState} from 'react';
import Modal from "../Modal/Modal";
import {execute} from "../../../core/store/execute";
import Requests from "../../../core/constants/requests";
import {useDispatch} from "react-redux";
import FieldSelectbox from "../FieldSelectbox/FieldSelectbox";
import Field from "../Field/Field";
import FormButton from "../FormButton/FormButton";

const devices = [
    {value: "AZART", label: "Азарт Р-187"}
]
const trainings = [
    {value: "", label: ""},
    {value: "UTK1", label: "УТК-1"},
    {value: "UTK2", label: "УТК-2"},
    {value: "UTK3", label: "УТК-3"},
    {value: "UTK4", label: "УТК-4"},
]

const CreateSessionForm = ({visible, setVisible}) => {
    const dispatch = useDispatch();
    const [session, setSession] = useState({training: ""})

    const createSession = () => {
        if (session) {
            execute(dispatch, {meta: {action: {type: Requests.CREATE_SESSION, request: true}}, payload: {session}});
            setVisible(false);
        }
    }

    return (
        <Modal visible={visible} close={() => setVisible(false)}>
            <FieldSelectbox title={"Устройство"} options={devices} />
            <FieldSelectbox title={"УТК"} options={trainings}
                            onChange={e => setSession({...session, training: e.target.value})}/>
            <FormButton onClick={createSession} label={"Создать сессию"}/>
        </Modal>
    );
};

export default CreateSessionForm;