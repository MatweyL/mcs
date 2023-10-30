import React, {useEffect, useState} from 'react';
import API from "../API/api";

const Selectbox = ({attribute, update}) => {
    const [dictionaryValues, setDictionaryValues] = useState([])
    const [formAttribute, setAttribute] = useState(attribute)
    
    useEffect(() => {
        console.log(formAttribute);

        API.getDictionary(attribute.dictionaryType)
            .then(rs => setDictionaryValues(rs.data.dictionaryValues))
    }, []);

    const updateAttribute = (e) => {
        let updatedAttribute = {...formAttribute, value: e.target.value};
        setAttribute(updatedAttribute);
        update(updatedAttribute);
    }

    return (
        <label>
            {attribute.label}
            <select onChange={updateAttribute} value={formAttribute.value}>
                {
                    dictionaryValues.map(dictionaryValue =>
                        <option key={dictionaryValue.value} value={dictionaryValue.value}>
                            {dictionaryValue.name}
                        </option>)
                }
            </select>
        </label>
    );
};

export default Selectbox;