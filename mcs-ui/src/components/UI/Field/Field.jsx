import React from 'react';
import classes from "./Field.module.css";

const Field = ({title, ...props}) => {
    return (
        <div className={classes.field}>
            <p>{title}</p>
            <input {...props}/>
        </div>
    );
};

export default Field;