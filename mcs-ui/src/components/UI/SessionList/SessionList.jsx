import React from 'react';
import Session from "./Session";
import classes from "./Session.module.css";

const SessionList = ({sessions}) => {
    return (
        <div className={classes.sessionList}>
            {sessions.map(session => <Session session={session}/>)}
        </div>
    );
};

export default SessionList;