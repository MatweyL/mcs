import React, {useState} from 'react';
import {useNavigate} from "react-router-dom";
import Field from "../components/UI/Field/Field";
import LoginButton from "../components/UI/LoginButton/LoginButton";
import LoginForm from "../components/UI/LoginForm/LoginForm";

/**
 * Страница входа
 */
const LoginPage = () => {
    const [user, setUser] = useState({patronymic: "", name: "", surname: "", group: ""})
    const navigate = useNavigate();

    const login = () => {
        console.log(user);
        navigate("/sessions");
    }

    return (
        <LoginForm>
            <h1 onClick={login} >Вход</h1>
            <Field title={"Фамилия"} value={user.patronymic}
                   onChange={e => setUser({...user, patronymic: e.target.value})}/>
            <Field title={"Имя"} value={user.name}
                   onChange={e => setUser({...user, name: e.target.value})}
            />
            <Field title={"Отчество"} value={user.surname}
                   onChange={e => setUser({...user, surname: e.target.value})}
            />
            <Field title={"Взвод"} value={user.group}
                   onChange={e => setUser({...user, group: e.target.value})}
            />
            <LoginButton onClick={login}/>
        </LoginForm>
    );
};

export default LoginPage;