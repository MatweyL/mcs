import React, {useEffect, useState} from 'react';
import SessionList from "../components/UI/SessionList/SessionList";
import {useSessions} from "../hooks/useSessions";
import SearchBar from "../components/UI/SearchBar/SearchBar";
import RoundButton from "../components/UI/RoundButton/RoundButton";
import {useDispatch} from "react-redux";
import Requests from "../core/constants/requests";
import {execute} from "../core/store/execute";
import {useAuthenticated} from "../hooks/useAuthenticated";
import CreateSessionForm from "../components/UI/CreateSessionForm/CreateSessionForm";

/**
 * Страница списка сессий пользователя
 */
const SessionListPage = () => {
    const dispatch = useDispatch();
    const sessions = useSessions();
    const authenticated = useAuthenticated();
    const [visibleForm, setVisibleForm] = useState(false);

    useEffect(() => {
        if (authenticated) {
            execute(dispatch, {meta: {action: {type: Requests.GET_SESSIONS, request: true}}});
        }
    }, []);

    const openFormCreateSession = () => {
        setVisibleForm(true)
    }

    return (
        <div>
            <h1>Список сессий пользователя</h1>
            <div style={{display: "flex", justifyContent: "space-between"}}>
                <SearchBar/>
                <div style={{display: "flex"}}>
                    <RoundButton>⌕</RoundButton>
                    <CreateSessionForm visible={visibleForm} setVisible={setVisibleForm}/>
                    <RoundButton onClick={openFormCreateSession}>+</RoundButton>
                </div>
            </div>
            <SessionList sessions={sessions}/>
        </div>
    );
};

export default SessionListPage;