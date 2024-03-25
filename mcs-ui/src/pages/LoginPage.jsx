import React, {useEffect, useState} from 'react';
import {useNavigate} from "react-router-dom";
import Field from "../components/UI/Field/Field";
import FormButton from "../components/UI/FormButton/FormButton";
import LoginForm from "../components/UI/LoginForm/LoginForm";
import FieldSelectbox from "../components/UI/FieldSelectbox/FieldSelectbox";
import API from "../API/api";
import {useDispatch} from "react-redux";
import Requests from "../core/constants/requests";
import {request} from "../hooks/request";

const fetchStudents = async (groupId) => (await API.getUsersByGroup(groupId)).map(
    user => {
        return {'value': user.uid, 'label': `${user.surname} ${user.name} ${user.patronymic}`}
    }
);
const fetchGroups = async () => (await API.getGroups()).map(
    group => {
        return {'value': group.uid, 'label': group.name}
    }
);

const EMPTY_OPTION = {value: '', label: ''};

/**
 * Страница входа
 */
const LoginPage = () => {
    const [password, setPassword] = useState("")
    const [students, setStudents] = useState([]);
    const [groups, setGroups] = useState([]);

    const [nowGroup, setNowGroup] = useState('');
    const [nowStudent, setNowStudent] = useState('');

    const [enabled, enable] = useState(false);

    const dispatch = useDispatch();

    const login = () => {
        request(Requests.LOGIN, {value: nowStudent, password}, dispatch);
    }

    useEffect(() => {
        fetchGroups().then(groups => setGroups([EMPTY_OPTION, ...groups]));
    }, []);

    useEffect(() => {
        if (nowGroup) {
            fetchStudents(nowGroup)
                .then(students => setStudents([EMPTY_OPTION, ...students]));
        }
    }, [nowGroup]);

    useEffect(() => {
        setPassword('')
    }, [nowStudent]);

    useEffect(() => {
        if (nowGroup && nowStudent && password) {
            enable(true);
        } else {
            enable(false);
        }
    }, [nowGroup, nowStudent, password]);

    return (
        <LoginForm>
            <h1>Вход</h1>
            <FieldSelectbox title={"Взвод"} options={groups} onChange={e => setNowGroup(e.target.value)}/>
            <FieldSelectbox title={"Студент"} options={students} onChange={e => setNowStudent(e.target.value)}/>
            <Field title={"Пароль"} value={password}
                   type={"password"}
                   onChange={e => setPassword(e.target.value)}/>
            <div style={{marginTop: "20px"}}>
                <FormButton onClick={login} label={"ВОЙТИ"} enabled={enabled}/>
            </div>
        </LoginForm>
    );
};

export default LoginPage;