import React, {useEffect, useState} from 'react';
import API from "../API/api";
import Selectbox from "./Selectbox";

const Screen = () => {
    const [attributes, setAttributes] = useState({})

    useEffect(() => {
        API.getScreen("CHANNEL_EDITOR")
            .then(rs => setAttributes(rs.data.attributes))
    }, []);

    return (
        <div className="screen">
            {Object.values(attributes).map(attribute => convert(attribute))}
        </div>
    );
};

function convert(attribute) {
    console.log(attribute.type);
    return TYPE_TO_CREATE_ELEMENT[attribute.type](attribute);
}

let TYPE_TO_CREATE_ELEMENT = {
    "TEXT": createText,
    "BOOLEAN": createCheckbox,
    "DICTIONARY": createSelectbox
}

function createSelectbox(attribute) {
    return (
        <Selectbox attribute={attribute}/>
    );
}

function createText(attribute) {
    return (
        <label>
            {attribute.label}
            <input/>
        </label>
    );
}

function createCheckbox(attribute) {
    return (
        <label>
            {attribute.label}
            <input type="checkbox"/>
        </label>
    );
}

export default Screen;