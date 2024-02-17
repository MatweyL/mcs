import React, {useEffect} from 'react';
import SessionList from "../components/UI/SessionList/SessionList";
import {useSessions} from "../hooks/useSessions";
import SearchBar from "../components/UI/SearchBar/SearchBar";
import RoundButton from "../components/UI/RoundButton/RoundButton";
import {executeRequest} from "../core/store/request";
import {useDispatch} from "react-redux";
import Requests from "../core/constants/requests";

/**
 * Страница списка сессий пользователя
 */
const SessionListPage = () => {
    const dispatch = useDispatch();
    const sessions = useSessions();

    const createSession = () => {

    }

    useEffect(() => {
        executeRequest(dispatch, {type: Requests.GET_SESSIONS})
    }, []);

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