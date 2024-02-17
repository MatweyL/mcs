import React from 'react';
import classes from "./Session.module.css";
import {useNavigate} from "react-router-dom";
import {useDispatch} from "react-redux";
import Actions from "../../../core/constants/actions";

const Session = ({session}) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const openScreenSession = () => {
        dispatch({type: Actions.OPEN_SCREEN_SESSION, payload: {sessionId: session.uid}})
        navigate("/screen");
    }

    return (
        <div className={classes.session} onClick={openScreenSession} key={session.uid}>
            <p>{session.title}</p>
            <p>{session.date}</p>
        </div>
    );
};

export default Session;