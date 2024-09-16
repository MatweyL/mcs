import React from 'react';
import classes from "./CallNotification.module.css";
import Call from "../../attributes/Call/Call";

const CallNotification = () => {
    return (
        <div className={classes.call}>
            Прием 262.425.
            <br/>
            ЧМ25
        </div>
    );
};

export default CallNotification;