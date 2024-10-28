import React from 'react';
import classes from "./FieldSelectbox.module.css";

const FieldSelectbox = ({title, options, ...props}) => {
    return (
        <div className={classes.fieldSelectbox}>
            {title && <p>{title}</p>}
            <select {...props}>
                {
                    options.map(option =>
                        <option key={option.value} value={option.value}>{option.label}</option>)
                }
            </select>
        </div>
    );
};

export default FieldSelectbox;