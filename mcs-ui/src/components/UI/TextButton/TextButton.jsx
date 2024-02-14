import React from 'react';
import classes from "./TextButton.module.css";

const TextButton = ({children, ...props}) => {
    return (
        <div className={classes.textButton} {...props}>
            {children}
        </div>
    );
};

export default TextButton;