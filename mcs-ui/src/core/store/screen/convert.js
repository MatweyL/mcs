import Text from "../../../components/attributes/Text/Text";
import Checkbox from "../../../components/attributes/Checkbox/Checkbox";
import React from "react";
import MenuItem from "../../../components/attributes/MenuItem/MenuItem";
import CardItem from "../../../components/attributes/CardItem/CardItem";
import OwnSelectBox from "../../../components/attributes/OwnSelectBox/OwnSelectBox";
import Attributes from "../../constants/attributes";

export function convert(attribute) {
    return attribute.visible && !attribute.clipped
        ? TYPE_TO_CREATE_ELEMENT[attribute.type](attribute)
        : null
}

const createCardItem = (attribute) => {
    return (
        <CardItem attribute={attribute} key={attribute.name}/>
    );
}

const createOwnSelectBox = (attribute) => {
    return (
        <OwnSelectBox attribute={attribute} key={attribute.name}/>
    );
}

const createText = (attribute) => {
    return (
        <Text attribute={attribute} key={attribute.name}/>
    );
}

const createCheckbox = (attribute) => {
    return (
        <Checkbox attribute={attribute} key={attribute.name}/>
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
