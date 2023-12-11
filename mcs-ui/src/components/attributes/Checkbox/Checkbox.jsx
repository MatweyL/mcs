import React, {useState} from 'react';
import Actions from "../../../store/constants/actions";
import classes from "./Checkbox.module.css";

/// Атрибут - Чекбокс (True/False)
const Checkbox = ({attribute, dispatch}) => {
    const [formAttribute, setAttribute] = useState(attribute)

    const updateAttribute = (e) => {
        let updatedAttribute = {...formAttribute, value: e.target.checked};
        // TODO: Подумать, возможно не нужно
        setAttribute(updatedAttribute);
        dispatch({type: Actions.UPDATE_ATTRIBUTE, payload: updatedAttribute})
    }

    return (
        <div className={classes.checkboxWrapper}>
            {attribute.label}
            <div className={attribute.active ? classes.checkboxActive : classes.checkbox}>
                <input type="checkbox"
                       checked={formAttribute.value}
                       onChange={updateAttribute}
                       id={attribute.name}
                />
            </div>
        </div>
    );
};

export default Checkbox;