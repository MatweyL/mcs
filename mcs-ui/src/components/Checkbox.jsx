import React, {useState} from 'react';

const Checkbox = ({attribute, update}) => {
    const [formAttribute, setAttribute] = useState(attribute)

    const updateAttribute = (e) => {
        let updatedAttribute = {...formAttribute, value: e.target.checked};
        setAttribute(updatedAttribute);
        update(updatedAttribute);
    }

    return (
        <label>
            {attribute.label}
            <input type="checkbox"
                   checked={formAttribute.value}
                   onChange={updateAttribute}/>
        </label>
    );
};

export default Checkbox;