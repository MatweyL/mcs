import React from 'react';
import classes from "./LoginForm.module.css";

const LoginForm = ({children}) => {
    return (
        <div className={classes.loginForm}>
            {children}
        </div>
    );
};

export default LoginForm;