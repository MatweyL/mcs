import Selectbox from "../components/Selectbox";
import Text from "../components/Text";
import Checkbox from "../components/Checkbox";
import React from "react";
import MenuItem from "../components/MenuItem";

export function convert(attribute, dispatch) {
    return attribute.visible
        ? TYPE_TO_CREATE_ELEMENT[attribute.type](attribute, dispatch)
        : null
}


const TYPE_TO_CREATE_ELEMENT = {
    "TEXT": createText,
    "BOOLEAN": createCheckbox,
    "DICTIONARY": createSelectbox,
    "MENU_ITEM": createMenuItem,
}

function createSelectbox(attribute, dispatch) {
    return (
        <Selectbox attribute={attribute} dispatch={dispatch} key={attribute.name}/>
    );
}

function createText(attribute, dispatch) {
    return (
        <Text attribute={attribute} dispatch={dispatch} key={attribute.name}/>
    );
}

function createCheckbox(attribute, dispatch) {
    return (
        <Checkbox attribute={attribute} dispatch={dispatch} key={attribute.name}/>
    );
}

function createMenuItem(attribute) {
    return (
        <MenuItem attribute={attribute} key={attribute.name}/>
    );
}