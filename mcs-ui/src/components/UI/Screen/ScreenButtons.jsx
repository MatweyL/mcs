import React from 'react';
import classes from "./Screen.module.css";
import Button from "../../attributes/Button";

const ScreenButtons = ({buttons}) => {
    return (
        buttons ?
            <div className={classes.buttons}>
                <Button button={buttons?.leftButton}/>
                <Button button={buttons?.rightButton}/>
            </div>
            : null
    );
};

export default ScreenButtons;