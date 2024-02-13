import EventHelper from "../../../core/store/helper/event_helper";

describe('EventHelper', () => {
    test('должен возвращать пустой список, если поля нет', () => {
        expect(EventHelper.getFiringValues({})).toEqual([]);
        expect(EventHelper.getFiringValues({firingValues: []})).toEqual([]);
        expect(EventHelper.getFiringValues({firingValues: null})).toEqual([]);
    })

    test('активируется, если значение в firingValues', () => {
        expect(EventHelper.isTriggeredByFiringValues({firingValues: [1]}, 1)).toBeTruthy();
        expect(EventHelper.isTriggeredByFiringValues({firingValues: [1, 2, 3]}, 2)).toBeTruthy();
        expect(EventHelper.isTriggeredByFiringValues({firingValues: [true]}, true)).toBeTruthy();
    })

    test('активируется, если значение не входит в excludeFiringValues', () => {
        expect(EventHelper.isTriggeredByExcludeFiringValues({excludeFiringValues: [1]}, 0)).toBeTruthy();
        expect(EventHelper.isTriggeredByExcludeFiringValues({excludeFiringValues: [1, 2, 3]}, 4)).toBeTruthy();
        expect(EventHelper.isTriggeredByExcludeFiringValues({excludeFiringValues: [true]}, false)).toBeTruthy();
    })
})