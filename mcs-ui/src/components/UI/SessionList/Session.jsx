import React from 'react';
import classes from "./Session.module.css";
import {useNavigate} from "react-router-dom";

const Session = ({session}) => {
    const navigate = useNavigate();

    const openScreenSession = () => {
        navigate("/screen");
    }

    return (
        <div className={classes.session} onClick={openScreenSession}>
            <p>{session.name}</p>
            <p>{session.date}</p>
        </div>
    );
};

export default Session;