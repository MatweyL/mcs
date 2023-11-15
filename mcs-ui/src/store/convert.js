import Selectbox from "../components/attributes/Selectbox";
import Text from "../components/attributes/Text";
import Checkbox from "../components/attributes/Checkbox";
import React from "react";
import MenuItem from "../components/attributes/MenuItem";

export function convert(attribute, dispatch) {
    return attribute.visible
        ? TYPE_TO_CREATE_ELEMENT[attribute.type](attribute, dispatch)
        : null
}


const createSelectbox = (attribute, dispatch) => {
    return (
        <Selectbox attribute={attribute} dispatch={dispatch} key={attribute.name}/>
    );
}

const createText = (attribute, dispatch) => {
    return (
        <Text attribute={attribute} dispatch={dispatch} key={attribute.name}/>
    );
}

const createCheckbox = (attribute, dispatch) => {
    return (
        <Checkbox attribute={attribute} dispatch={dispatch} key={attribute.name}/>
    );
}

const createMenuItem = (attribute) => {
    return (
        <MenuItem attribute={attribute} key={attribute.name}/>
    );
}

const TYPE_TO_CREATE_ELEMENT = {
    "TEXT": createText,
    "BOOLEAN": createCheckbox,
    "DICTIONARY": createSelectbox,
    "MENU_ITEM": createMenuItem,
}
