import React from 'react';
import ControlKeyboard from "./ControlKeyboard";
import NumpadKeyboard from "./NumpadKeyboard";
import classes from "./Keyboard.module.css";

const Keyboard = () => {
    return (
        <div className={classes.keyboard}>
            <ControlKeyboard/>
            <div className={classes.dividerKeyboard}/>
            <NumpadKeyboard/>
        </div>
    );
};

export default Keyboard;