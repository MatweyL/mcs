import React, {useState} from 'react';
import Actions from "../../../core/constants/actions";
import classes from "./Checkbox.module.css";
import {useDispatch} from "react-redux";

/**
 * Атрибут - Чекбокс (True/False)
 */
const Checkbox = ({attribute}) => {
    const dispatch = useDispatch();

    const updateAttribute = (e) => {
        let updatedAttribute = {...attribute, value: e.target.checked};
        dispatch({type: Actions.UPDATE_ATTRIBUTE, payload: {attribute: updatedAttribute}})
    }

    return (
        <div className={classes.checkboxWrapper}>
            {attribute.label}
            <div className={attribute.active ? classes.checkboxActive : classes.checkbox}>
                <input type="checkbox"
                       checked={attribute.value}
                       onChange={updateAttribute}
                       id={attribute.name}
                />
            </div>
        </div>
    );
};

export default Checkbox;