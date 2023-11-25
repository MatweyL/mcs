import React, {useEffect, useState} from 'react';
import Actions from "../../store/constants/actions";

/// Атрибут - Текстовое поле
const Text = ({attribute, dispatch}) => {
    const [formAttribute, setAttribute] = useState(attribute)

    const updateAttribute = (e) => {
        let updatedAttribute = {...formAttribute, value: e.target.value};
        setAttribute(updatedAttribute);
        dispatch({type: Actions.UPDATE_ATTRIBUTE, payload: updatedAttribute})
    }

    useEffect(() => {
        if (attribute.active) {
            document.getElementById(attribute.name).focus();
        }
    }, [attribute.value, attribute.active]);

    return (
        <label>
            {attribute.label}
            <input value={formAttribute.value}
                   key={attribute.name}
                   id={attribute.name}
                   onChange={updateAttribute}
                   className={`attribute${attribute.active ? '-active' : ''}`}
                   readOnly={!attribute.active}
            />
        </label>
    );
};

export default Text;