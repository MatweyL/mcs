import React, {useEffect, useState} from 'react';
import Actions from "../../../core/constants/actions";
import classes from "./Text.module.css";
import {useDispatch} from "react-redux";

/**
 * Атрибут - Текстовое поле
 */
const Text = ({attribute}) => {
    const dispatch = useDispatch();

    const updateAttribute = (e) => {
        let updatedAttribute = {...attribute, value: e.target.value};
        dispatch({type: Actions.UPDATE_ATTRIBUTE, payload: {attribute: updatedAttribute}})
    }

    useEffect(() => {
        if (attribute.active) {
            document.getElementById(attribute.name).focus();
        }
    }, [attribute.value, attribute.active]);

    return (
        <div className={classes.textWrapper}>
            {attribute.label}
            <input value={attribute.value}
                   key={attribute.name}
                   id={attribute.name}
                   onChange={updateAttribute}
                   className={attribute.active ? classes.textActive : classes.text}
                   readOnly={!attribute.active}
            />
        </div>
    );
};

export default Text;