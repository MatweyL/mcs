import React, {useEffect, useState} from 'react';
import API from "../API/api";

const Selectbox = ({attribute}) => {
    const [dictionaryValues, setDictionaryValues] = useState([])

    useEffect(() => {
        API.getDictionary(attribute.dictionaryType)
            .then(rs => setDictionaryValues(rs.data.dictionaryValues))
    }, []);

    return (
        <label>
            {attribute.label}
            <select>
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