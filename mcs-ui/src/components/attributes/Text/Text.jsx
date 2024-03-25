import React, {useEffect} from 'react';
import Actions from "../../../core/constants/actions";
import classes from "./Text.module.css";
import {useDispatch} from "react-redux";
import Width from "../../../core/constants/width";

/**
 * Атрибут - Текстовое поле
 */
const Text = ({attribute}) => {
    const dispatch = useDispatch();

    const width = Width.of(attribute.width);

    const wrapperClass = attribute.width === Width.FULL ? classes.textWrapper : classes.textWrapper;
    const activeClass =  classes.textActive;
    const inactiveClass = classes.text;

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
        <div className={wrapperClass}>
            {attribute.label}
            <div style={{position: "absolute", right: "5px"}}>
                {attribute.postfix}
            </div>
            <input value={attribute.value}
                   key={attribute.name}
                   id={attribute.name}
                   onChange={updateAttribute}
                   className={attribute.active ? activeClass : inactiveClass}
                   readOnly={!attribute.active}
                   style={{width}}
            />
        </div>
    );
};

export default Text;