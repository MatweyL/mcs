import React from 'react';
import classes from "./CallNotification.module.css";
import Call from "../../attributes/Call/Call";

const CallNotification = ({sessionId}) => {
    return (
        <div className={classes.call}>
            Прием 262.425.
            <br/>
            ЧМ25
            <Call roomId={"__"} sessionId={sessionId}/>
        </div>
    );
};

export default CallNotification;