import React, {useEffect} from 'react';
import SessionList from "../components/UI/SessionList/SessionList";
import {useSessions} from "../hooks/useSessions";
import SearchBar from "../components/UI/SearchBar/SearchBar";
import RoundButton from "../components/UI/RoundButton/RoundButton";
import {useDispatch} from "react-redux";
import Requests from "../core/constants/requests";
import {execute} from "../core/store/execute";

/**
 * Страница списка сессий пользователя
 */
const SessionListPage = () => {
    const dispatch = useDispatch();
    const sessions = useSessions();

    const createSession = () => {
        execute(dispatch, {meta: {action: {type: Requests.CREATE_SESSION, request: true}}});
    }

    useEffect(() => {
        execute(dispatch, {meta: {action: {type: Requests.GET_SESSIONS, request: true}}});
    }, []);

    return (
        <div>
            <h1>Список сессий пользователя</h1>
            <div style={{display: "flex", justifyContent: "space-between"}}>
                <SearchBar/>
                <div style={{display: "flex"}}>
                    <RoundButton>⌕</RoundButton>
                    <RoundButton onClick={createSession}>+</RoundButton>
                </div>
            </div>
            <SessionList sessions={sessions}/>
        </div>
    );
};

export default SessionListPage;