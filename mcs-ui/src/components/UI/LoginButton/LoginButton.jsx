import React from 'react';
import classes from "./LoginButton.module.css";

const LoginButton = ({...props}) => {
    return (
        <div {...props} className={classes.loginButton}>
            ВОЙТИ
        </div>
    );
};

export default LoginButton;