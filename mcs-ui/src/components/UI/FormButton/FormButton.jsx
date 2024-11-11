import React from 'react';
import classes from "./FormButton.module.css";

const FormButton = ({label, enabled = true, onClick, ...props}) => {
    const rootClasses = [
        classes.formButton,
        enabled ? null : classes.formButtonDisabled
    ];

    const handleClick = () => {
        if (enabled) {
            onClick();
        }
    }

    return (
        <div onClick={handleClick}  {...props} className={rootClasses.join(" ")}>
            {label}
        </div>
    );
};

export default FormButton;