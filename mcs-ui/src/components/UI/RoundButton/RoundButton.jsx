import React from 'react';
import classes from "./RoundButton.module.css";

const RoundButton = ({children, ...props}) => {
    return (
        <div className={classes.roundButton} {...props}>
            {children}
        </div>
    );
};

export default RoundButton;