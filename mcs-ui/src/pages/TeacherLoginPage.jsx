import React, {useEffect, useState} from 'react';
import {useDispatch} from "react-redux";
import {request} from "../hooks/request";
import Requests from "../core/constants/requests";
import LoginForm from "../components/UI/LoginForm/LoginForm";
import FieldSelectbox from "../components/UI/FieldSelectbox/FieldSelectbox";
import Field from "../components/UI/Field/Field";
import FormButton from "../components/UI/FormButton/FormButton";
import {fetchTeachers} from "../API/fetchers";
import {EMPTY_OPTION} from "../core/constants/ui";


const TeacherLoginPage = () => {
    const [password, setPassword] = useState("")
    const [teachers, setTeachers] = useState([]);

    const [nowTeacher, setNowTeacher] = useState('');

    const [enabled, enable] = useState(false);

    const dispatch = useDispatch();

    const login = () => {
        request(Requests.LOGIN, {value: nowTeacher, password}, dispatch);
    }

    useEffect(() => {
        fetchTeachers()
            .then(teachers => setTeachers([EMPTY_OPTION, ...teachers]));
    }, []);

    useEffect(() => {
        setPassword('')
    }, [nowTeacher]);

    useEffect(() => {
        if (nowTeacher && password) {
            enable(true);
        } else {
            enable(false);
        }
    }, [nowTeacher, password]);

    return (
        <LoginForm>
            <h1>Вход</h1>
            <FieldSelectbox title={"Преподаватель"} options={teachers} onChange={e => setNowTeacher(e.target.value)}/>
            <Field title={"Пароль"} value={password}
                   type={"password"}
                   onChange={e => setPassword(e.target.value)}/>
            <div style={{marginTop: "20px"}}>
                <FormButton onClick={login} label={"ВОЙТИ"} enabled={enabled}/>
            </div>
        </LoginForm>
    );
};

export default TeacherLoginPage;