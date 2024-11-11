import React, {useEffect} from 'react';
import {useDispatch} from "react-redux";
import Requests from "../core/constants/requests";
import Keyboard from "../components/UI/Keyboard/Keyboard";
import Screen from "../components/UI/Screen/Screen";
import ScreenShadow from "../components/UI/Screen/ScreenShadow";
import TextButton from "../components/UI/TextButton/TextButton";
import {useNavigate} from "react-router-dom";
import {RoutePaths} from "../router";
import ScreenSessionControl from "../components/UI/ScreenSessionControl/ScreenSessionControl";
import TrainingHintBox from "../components/UI/TrainingHintBox/TrainingHintBox";
import {useSession} from "../hooks/useSession";
import {request} from "../hooks/request";
import ScreenBlock from "../components/UI/ScreenBlock/ScreenBlock";
import {cacheService} from "../core/di";
import {CacheKeys} from "../core/store/cache_service";
import CallNotification from "../components/UI/Screen/CallNotification";
import CallMedia from "../components/UI/Screen/CallMedia";

/**
 * Страница экрана телефона
 */
const ScreenPage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const {call, sessionId} = useSession();

    useEffect(() => {
        const id = sessionId ?? cacheService.get(CacheKeys.SESSION_ID_KEY);
        request(Requests.LOAD, {sessionId: id}, dispatch);
    }, []);

    const back = () => {
        request(Requests.CLOSE_SCREEN_SESSION, {}, dispatch);
        navigate(RoutePaths.SESSIONS);
    }

    return (
        <div style={{display: "flex", justifyContent: "space-between", width: "100%"}}>
            <div style={{position: "absolute", right: "5%", top: "10%"}}>
                {call ? <CallMedia sessionId={sessionId}/> : null }
            </div>
            <div style={{
                width: "30%",
                justifyContent: "start",
                display: "flex",
                flexDirection: "column",
                alignItems: "center"
            }}>
                <div style={{marginTop: "100px", fontSize: "18px"}}>
                    <TextButton onClick={back}>← Назад</TextButton>
                </div>
                <div style={{height: "100%", display: "flex", flexDirection: "column", justifyContent: "end"}}>
                    <div style={{marginBottom: "100px", width: "250px"}}>
                        <TrainingHintBox/>
                    </div>
                </div>
            </div>
            <div style={{width: "30%", justifyContent: "center", display: "flex"}}>
                <div className="body">
                    <ScreenBlock/>
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
