import React from 'react';
import classes from "./Screen.module.css";

const ScreenLabel = ({label}) => {
    return (
        label ? <div className={classes.screenLabel}>{label}</div> : null
    );
};

export default ScreenLabel;