import React, {useEffect} from 'react';
import {useDispatch} from "react-redux";
import {executeRequest} from "../core/store/request";
import Requests from "../core/constants/requests";
import Keyboard from "../components/UI/Keyboard/Keyboard";
import Screen from "../components/UI/Screen/Screen";
import ScreenShadow from "../components/UI/Screen/ScreenShadow";
import TextButton from "../components/UI/TextButton/TextButton";
import {useNavigate} from "react-router-dom";

/**
 * Страница экрана телефона
 */
const ScreenPage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        executeRequest(dispatch, {type: Requests.LOAD});
    }, []);

    const back = () => {
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
