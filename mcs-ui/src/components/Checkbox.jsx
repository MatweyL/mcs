import React, {useState} from 'react';

const Checkbox = ({attribute, dispatch}) => {
    const [formAttribute, setAttribute] = useState(attribute)

    const updateAttribute = (e) => {
        let updatedAttribute = {...formAttribute, value: e.target.checked};
        // Подумать, возможно не нужно
        setAttribute(updatedAttribute);
        dispatch({type: "UPDATE_ATTRIBUTE", payload: updatedAttribute})
    }

    return (
        <label>
            {attribute.label}
            <input type="checkbox"
                   checked={formAttribute.value}
                   onChange={updateAttribute}
                   id={attribute.name}
                   className={`attribute${attribute.active ? '-active' : ''}`}/>
        </label>
    );
};

export default Checkbox;