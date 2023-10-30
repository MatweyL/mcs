import React, {useState} from 'react';

const Text = ({attribute, update}) => {
    const [formAttribute, setAttribute] = useState(attribute)

    const updateAttribute = (e) => {
        let updatedAttribute = {...formAttribute, value: e.target.value};
        setAttribute(updatedAttribute);
        update(updatedAttribute);
    }

    return (
        <label>
            {attribute.label}
            <input value={formAttribute.value}
                   onChange={updateAttribute}/>
        </label>
    );
};

export default Text;