import React, {useEffect, useState} from 'react';
import API from "../API/api";

const Selectbox = ({attribute, dispatch}) => {
    const [dictionaryValues, setDictionaryValues] = useState([])
    const [formAttribute, setAttribute] = useState(attribute)
    
    useEffect(() => {
        console.log(formAttribute);
        API.getDictionary(attribute.dictionaryType)
            .then(rs => setDictionaryValues(rs.data.dictionaryValues))
    }, []);

    useEffect(() => {
        console.log(`${attribute.name} ${attribute.selected ? 'selected' : 'muted'}`)
    }, [attribute.selected]);

    const updateAttribute = (e) => {
        let updatedAttribute = {...formAttribute, value: e.target.value};
        setAttribute(updatedAttribute);
        dispatch({type: "UPDATE_ATTRIBUTE", payload: updatedAttribute})
    }

    useEffect(() => {
        if (attribute.active) {

        }
    }, [attribute.active]);

    return (
        <label>
            {attribute.label}
            <select onChange={updateAttribute}
                    key={attribute.name}
                    id={attribute.name}
                    value={formAttribute.value}
                    className={`attribute${attribute.active ? '-active' : ''}`}>
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