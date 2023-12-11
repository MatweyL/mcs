import EventHelper from "./event_helper";
import Attributes from "../constants/attributes";

const EMPTY = "";

export default class AttributeHelper {
    static isVisible(attribute) {
        return attribute.visible !== false;
    }

    static isNotVisible(attribute) {
        return attribute.visible !== true;
    }

    static isDefaultCardItem(attribute) {
        return attribute.type === Attributes.CARD_ITEM
            && attribute.default === true;
    }

    static countOfType(attributes, type) {
        return Object.values(attributes)
            .filter(attribute => attribute.type === type)
            .length;
    }

    static isDisabled(attribute) {
        return attribute.disabled === true;
    }

    static isNotDisabled(attribute) {
        return attribute.disabled !== true;
    }

    static getEvents(attribute) {
        return attribute.events
            ? attribute.events
            : [];
    }

    static isEventTriggeredByAttribute(event, attribute) {
        return event.attribute === attribute.name
            && this._isEventTriggeredByAttributeValue(event, attribute.value);
    }

    static _isEventTriggeredByAttributeValue(event, value) {
         return EventHelper.isTriggeredByFiringValues(event, value)
             || EventHelper.isTriggeredByExcludeFiringValues(event, value);
    }

    static getTextValueOrEmpty(attribute) {
        return attribute.value ? attribute.value : EMPTY;
    }
}