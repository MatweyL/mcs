import React from 'react';
import classes from "./Session.module.css";
import {useNavigate} from "react-router-dom";
import {useDispatch} from "react-redux";
import {RoutePaths} from "../../../router";
import {request} from "../../../hooks/request";
import Requests from "../../../core/constants/requests";
import SessionLabel from "./SessionLabel";

const Session = ({session}) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const openScreenSession = () => {
        request(Requests.OPEN_SCREEN_SESSION, {sessionId: session.uid, status: session.status}, dispatch);
        navigate(RoutePaths.SCREEN);
    }

    return (
        <div className={classes.session} onClick={openScreenSession} key={session.uid}>
            <div style={{height: '10px'}}/>
            <SessionLabel type={session.type}/>
            <div>
                <p>{session.title}</p>
                <p>{session.date}</p>
            </div>
        </div>
    );
};

export default Session;