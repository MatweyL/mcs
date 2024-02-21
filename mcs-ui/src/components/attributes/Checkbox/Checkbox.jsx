import React, {useState} from 'react';
import Actions from "../../../core/constants/actions";
import classes from "./Checkbox.module.css";
import {useDispatch} from "react-redux";
import Width from "../../../core/constants/width";

/**
 * Атрибут - Чекбокс (True/False)
 */
const Checkbox = ({attribute}) => {
    const dispatch = useDispatch();

    const width = Width.of(attribute.width);

    const wrapperClass = attribute.width === Width.FULL ? classes.checkboxWrapper : classes.checkboxWrapper;
    const activeClass =  classes.checkboxActive;
    const inactiveClass = classes.checkbox;

    const updateAttribute = (e) => {
        let updatedAttribute = {...attribute, value: e.target.checked};
        dispatch({type: Actions.UPDATE_ATTRIBUTE, payload: {attribute: updatedAttribute}})
    }

    return (
        <div className={wrapperClass}>
            {attribute.label}
            <div className={attribute.active ? activeClass : inactiveClass} style={{width}}>
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