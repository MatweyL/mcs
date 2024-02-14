import React from 'react';
import SessionList from "../components/UI/SessionList/SessionList";
import {useSessions} from "../hooks/useSessions";
import SearchBar from "../components/UI/SearchBar/SearchBar";
import RoundButton from "../components/UI/RoundButton/RoundButton";

/**
 * Страница списка сессий пользователя
 */
const SessionListPage = () => {
    const sessions = useSessions();

    const createSession = () => {

    }

    return (
        <div>
            <h1>Список сессий пользователя</h1>
            <div style={{display: "flex", justifyContent: "space-between"}}>
                <SearchBar/>
                <div style={{display: "flex"}}>
                    <RoundButton>⌕</RoundButton>
                    <RoundButton onClick={createSession} >+</RoundButton>
                </div>
            </div>
            <SessionList sessions={sessions}/>
        </div>
    );
};

export default SessionListPage;