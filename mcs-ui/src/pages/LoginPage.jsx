import React from 'react';
import {useNavigate} from "react-router-dom";

/**
 * Страница входа
 */
const LoginPage = () => {
    const navigate = useNavigate();

    const login = () => {
        navigate("/sessions");
    }

    return (
        <div>
            <h1 onClick={login} >Вход</h1>
        </div>
    );
};

export default LoginPage;