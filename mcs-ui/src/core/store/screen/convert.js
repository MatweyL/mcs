import Text from "../../../components/attributes/Text/Text";
import Checkbox from "../../../components/attributes/Checkbox/Checkbox";
import React from "react";
import MenuItem from "../../../components/attributes/MenuItem/MenuItem";
import CardItem from "../../../components/attributes/CardItem/CardItem";
import OwnSelectBox from "../../../components/attributes/OwnSelectBox/OwnSelectBox";
import Attributes from "../../constants/attributes";
import MainScreenAttribute from "../../../components/attributes/MainScreenAttribute/MainScreenAttribute";
import SelectableCardItem from "../../../components/attributes/SelectableCardItem/SelectableCardItem";

export function convert(attribute) {
    return attribute.visible && !attribute.clipped
        ? TYPE_TO_CREATE_ELEMENT[attribute.type](attribute)
        : null
}

const cardItem = (attribute) => <CardItem attribute={attribute} key={attribute.name}/>
const selectableCardItem = (attribute) => <SelectableCardItem attribute={attribute} key={attribute.name}/>

const ownSelectBox = (attribute) => <OwnSelectBox attribute={attribute} key={attribute.name}/>

const text = (attribute) => <Text attribute={attribute} key={attribute.name}/>

const checkbox = (attribute) => <Checkbox attribute={attribute} key={attribute.name}/>

const menuItem = (attribute) => <MenuItem attribute={attribute} key={attribute.name}/>

const mainScreen = (attribute) => <MainScreenAttribute attribute={attribute} key={attribute.name}/>

const TYPE_TO_CREATE_ELEMENT = {
    [Attributes.TEXT]: text,
    [Attributes.BOOLEAN]: checkbox,
    [Attributes.DICTIONARY]: ownSelectBox,
    [Attributes.MENU_ITEM]: menuItem,
    [Attributes.CARD_ITEM]: cardItem,
    [Attributes.SELECTABLE_CARD_ITEM]: selectableCardItem,
    [Attributes.MAIN_SCREEN]: mainScreen,
}
