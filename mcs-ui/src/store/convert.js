import Text from "../components/attributes/Text";
import Checkbox from "../components/attributes/Checkbox";
import React from "react";
import MenuItem from "../components/attributes/MenuItem";
import CardItem from "../components/attributes/CardItem";
import OwnSelectBox from "../components/attributes/OwnSelectBox";
import Attributes from "./constants/attributes";

export function convert(attribute, dispatch) {
    return attribute.visible
        ? TYPE_TO_CREATE_ELEMENT[attribute.type](attribute, dispatch)
        : null
}

const createCardItem = (attribute) => {
    return (
        <CardItem attribute={attribute}/>
    );
}

const createOwnSelectBox = (attribute) => {
    return (
        <OwnSelectBox attribute={attribute} key={attribute.name}/>
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
    [Attributes.TEXT]: createText,
    [Attributes.BOOLEAN]: createCheckbox,
    [Attributes.DICTIONARY]: createOwnSelectBox,
    [Attributes.MENU_ITEM]: createMenuItem,
    [Attributes.CARD_ITEM]: createCardItem,
}
