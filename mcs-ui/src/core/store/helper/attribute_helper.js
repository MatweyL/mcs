import EventHelper from "./event_helper";
import Attributes from "../../constants/attributes";

const EMPTY = "";

export default class AttributeHelper {
    static isVisible(attribute) {
        return attribute.visible !== false;
    }

    static isNotVisible(attribute) {
        return attribute.visible !== true;
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

    static isDefaultCardItem(attribute) {
        return this.isDefault(attribute, Attributes.CARD_ITEM)
    }

    static isDefaultSelectableCardItem(attribute) {
        return this.isDefault(attribute, Attributes.SELECTABLE_CARD_ITEM)
    }

    static isDefault(attribute, type) {
        return attribute.type === type
            && attribute.default === true;
    }

    static countOfType(attributes, type) {
        return Object.values(attributes)
            .filter(attribute => attribute.type === type)
            .length;
    }

    static isVisibleAndNotClipped(attribute) {
        return this.isVisible(attribute) && !this.isClipped(attribute);
    }

    static clipAttribute(attribute) {
        attribute.clipped = true;
    }

    static unClipAttribute(attribute) {
        attribute.clipped = false;
    }

    static isClipped(attribute) {
        return attribute.clipped !== undefined
            && attribute.clipped;
    }

    static isDisabled(attribute) {
        return attribute.disabled === true;
    }

    static isNotDisabled(attribute) {
        return attribute.disabled !== true;
    }
}