import React, {useEffect, useState} from 'react';
import {useNavigate} from "react-router-dom";
import Field from "../components/UI/Field/Field";
import LoginButton from "../components/UI/LoginButton/LoginButton";
import LoginForm from "../components/UI/LoginForm/LoginForm";
import FieldSelectbox from "../components/UI/FieldSelectbox/FieldSelectbox";
import API from "../API/api";
import {useDispatch} from "react-redux";
import Requests from "../core/constants/requests";
import {execute} from "../core/store/execute";
import {useAuthenticated} from "../hooks/useAuthenticated";

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
    const navigate = useNavigate();

    const [password, setPassword] = useState("")
    const [students, setStudents] = useState([]);
    const [groups, setGroups] = useState([]);

    const [nowGroup, setNowGroup] = useState('');
    const [nowStudent, setNowStudent] = useState('');

    const dispatch = useDispatch();
    const authenticated = useAuthenticated();

    const auth = () => {
        execute(dispatch, {
            meta: {action: {type: Requests.AUTHENTICATE, request: true}},
            payload: {value: nowStudent, password}
        })
    }

    useEffect(() => {
        if (authenticated) {
            navigate("/sessions")
        }
    }, [authenticated])

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

    return (
        <LoginForm>
            <h1>Вход</h1>
            <FieldSelectbox title={"Взвод"} options={groups} onChange={e => setNowGroup(e.target.value)}/>
            <FieldSelectbox title={"Студент"} options={students} onChange={e => setNowStudent(e.target.value)}/>
            <Field title={"Пароль"} value={password}
                   type={"password"}
                   onChange={e => setPassword(e.target.value)}/>
            <LoginButton onClick={auth}/>
        </LoginForm>
    );
};

export default LoginPage;