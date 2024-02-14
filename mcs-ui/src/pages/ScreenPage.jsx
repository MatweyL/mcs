import React, {useEffect} from 'react';
import {useDispatch} from "react-redux";
import {executeRequest} from "../core/store/request";
import Requests from "../core/constants/requests";
import Keyboard from "../components/UI/Keyboard/Keyboard";
import Screen from "../components/UI/Screen/Screen";
import ScreenShadow from "../components/UI/Screen/ScreenShadow";

/**
 * Страница экрана телефона
 */
const ScreenPage = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        executeRequest(dispatch,{type: Requests.LOAD});
    }, []);

    return (
        <div className="body">
            <div className="phone-header"/>
            <Screen/>
            <Keyboard/>
            <ScreenShadow/>
        </div>
    );
};

export default ScreenPage;
