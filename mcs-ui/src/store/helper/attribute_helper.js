import EventHelper from "./event_helper";

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
}