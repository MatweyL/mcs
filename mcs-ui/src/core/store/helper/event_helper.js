export default class EventHelper {
    static getFiringValues(event) {
        return event.firingValues ? event.firingValues : []
    }

    static isTriggeredByFiringValues(event, value) {
        return this.getFiringValues(event).includes(value);
    }

    static isTriggeredByExcludeFiringValues(event, value) {
        return event.excludeFiringValues
            ? !event.excludeFiringValues.includes(value)
            : false;
    }
}