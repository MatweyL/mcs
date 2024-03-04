import React from 'react';
import classes from "./FormButton.module.css";

const FormButton = ({label, ...props}) => {
    return (
        <div {...props} className={classes.formButton}>
            {label}
        </div>
    );
};

export default FormButton;