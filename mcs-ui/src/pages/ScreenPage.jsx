import React, {useEffect} from 'react';
import {useDispatch} from "react-redux";
import Requests from "../core/constants/requests";
import Keyboard from "../components/UI/Keyboard/Keyboard";
import Screen from "../components/UI/Screen/Screen";
import ScreenShadow from "../components/UI/Screen/ScreenShadow";
import TextButton from "../components/UI/TextButton/TextButton";
import {useNavigate} from "react-router-dom";
import {useScreenSessionId} from "../hooks/useScreenSessionId";
import {execute} from "../core/store/execute";
import {RoutePaths} from "../router";
import FormButton from "../components/UI/FormButton/FormButton";
import ScreenSessionControl from "../components/UI/ScreenSessionControl/ScreenSessionControl";

/**
 * Страница экрана телефона
 */
const ScreenPage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const sessionId = useScreenSessionId();

    useEffect(() => {
        execute(dispatch, {meta: {action: {type: Requests.LOAD, request: true}}, payload: {sessionId}});
    }, []);

    const back = () => {
        execute(dispatch, {meta: {action: {type: Requests.CLOSE_SCREEN_SESSION, request: true}}});
        navigate(RoutePaths.SESSIONS);
    }

    return (
        <div style={{display: "flex", justifyContent: "space-between", width: "100%"}}>
            <div style={{width: "30%", justifyContent: "center", display: "flex"}}>
                <TextButton onClick={back}>← Назад</TextButton>
            </div>
            <div style={{width: "30%", justifyContent: "center", display: "flex"}}>
                <div className="body">
                    <div className="phone-header"/>
                    <Screen/>
                    <Keyboard/>
                    <ScreenShadow/>
                </div>
            </div>
            <div style={{width: "30%", justifyContent: "end", display: "flex", flexDirection: "column"}}>
                <ScreenSessionControl/>
            </div>
        </div>
    );
};

export default ScreenPage;
