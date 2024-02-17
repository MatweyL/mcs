import React, {useEffect} from 'react';
import {useDispatch} from "react-redux";
import Requests from "../core/constants/requests";
import Keyboard from "../components/UI/Keyboard/Keyboard";
import Screen from "../components/UI/Screen/Screen";
import ScreenShadow from "../components/UI/Screen/ScreenShadow";
import TextButton from "../components/UI/TextButton/TextButton";
import {useNavigate} from "react-router-dom";
import {useScreenSessionId} from "../hooks/useScreenSessionId";
import {execute} from "../core/store/executor";

/**
 * Страница экрана телефона
 */
const ScreenPage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const sessionId = useScreenSessionId();

    useEffect(() => {
        execute(dispatch, {meta: {type: Requests.LOAD, request: true}, payload: {sessionId}});
    }, []);

    const back = () => {
        execute(dispatch, {meta: {type: Requests.CLOSE_SCREEN_SESSION, request: true}});
        navigate("/sessions");
    }

    return (
        <div style={{display: "flex", justifyContent: "space-between", width: "100%"}}>
            <div style={{width: "20%", justifyContent: "center", display: "flex"}}>
                <TextButton onClick={back}>← Назад</TextButton>
            </div>
            <div style={{width: "50%", justifyContent: "center", display: "flex"}}>
                <div className="body">
                    <div className="phone-header"/>
                    <Screen/>
                    <Keyboard/>
                    <ScreenShadow/>
                </div>
            </div>
            <div style={{width: "20%"}}>
            </div>
        </div>
    );
};

export default ScreenPage;
