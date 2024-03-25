import React from 'react';
import classes from "./FormButton.module.css";

const FormButton = ({label, enabled = true, ...props}) => {
    const rootClasses = [
        classes.formButton,
        enabled ? null : classes.formButtonDisabled
    ];

    return (
        <div {...props} className={rootClasses.join(" ")}>
            {label}
        </div>
    );
};

export default FormButton;