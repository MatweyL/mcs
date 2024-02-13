import React from 'react';
import {useSelector} from "react-redux";
import SessionList from "../components/UI/SessionList/SessionList";
import {useSessions} from "../hooks/useSessions";

/**
 * Страница списка сессий пользователя
 */
const SessionListPage = () => {
    const sessions = useSessions();

    return (
        <div>
            <h1>Список сессий пользователя</h1>
            <SessionList sessions={sessions}/>
        </div>
    );
};

export default SessionListPage;