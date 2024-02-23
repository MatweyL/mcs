import AttributeHelper from "../../../core/store/helper/attribute_helper";

describe('AttributeHelper', () => {
    test('должен возвращать пустой список событий, если событий нет', () => {
        expect(AttributeHelper.getEvents({})).toEqual([])
        expect(AttributeHelper.getEvents({events: []})).toEqual([])
        expect(AttributeHelper.getEvents({events: null})).toEqual([])
    })

    describe('должен возвращать true, если значение атрибута запускает событие,', () => {
        test('когда значение атрибута в firingValues', () => {
            // GIVEN
            const event = {
                attribute: 'ATTRIBUTE',
                firingValues: [1]
            }

            const attribute = {
                value: 1,
                name: 'ATTRIBUTE'
            }

            // WHEN | THEN
            expect(AttributeHelper.isEventTriggeredByAttribute(event, attribute)).toBeTruthy()
        });

        test('когда значение атрибута не входит в excludeFiringValues', () => {
            // GIVEN
            const event = {
                attribute: 'ATTRIBUTE',
                excludeFiringValues: [1, 2, 3, 5]
            }

            const attribute = {
                value: 4,
                name: 'ATTRIBUTE'
            }

            // WHEN | THEN
            expect(AttributeHelper.isEventTriggeredByAttribute(event, attribute)).toBeTruthy()
        });
    });

    describe('должен возвращать false, если значение атрибута не запускает событие,', () => {
        test('когда значение атрибута не в firingValues', () => {
            // GIVEN
            const event = {
                attribute: 'ATTRIBUTE',
                firingValues: [1]
            }

            const attribute = {
                value: null,
                name: 'ATTRIBUTE'
            }

            // WHEN | THEN
            expect(AttributeHelper.isEventTriggeredByAttribute(event, attribute)).toBeFalsy();
        });

        test('когда значение атрибута входит в excludeFiringValues', () => {
            // GIVEN
            const event = {
                attribute: 'ATTRIBUTE',
                excludeFiringValues: [1, 2, 3, 5]
            }

            const attribute = {
                value: 1,
                name: 'ATTRIBUTE'
            }

            // WHEN | THEN
            expect(AttributeHelper.isEventTriggeredByAttribute(event, attribute)).toBeFalsy();
        });

        test('когда имя атрибута входит не совпадает с именем в событии', () => {
            // GIVEN
            const event = {
                attribute: 'ATTRIBUTE_OTHER',
                excludeFiringValues: [1, 2, 3, 5]
            }

            const attribute = {
                value: [4],
                name: 'ATTRIBUTE'
            }

            // WHEN | THEN
            expect(AttributeHelper.isEventTriggeredByAttribute(event, attribute)).toBeFalsy();
        });
    });

    test.each`
        attribute           | expected
        ${{clipped: true}}   ${true}
        ${{clipped: false}}  ${false}
        ${{}}                ${false}
        `
    ("isClipped", ({attribute, expected}) => {
        expect(AttributeHelper.isClipped(attribute)).toBe(expected)
    })

    test.each`
        attribute           | expected
        ${{visible: true}}   ${true}
        ${{visible: false}}  ${false}
        ${{}}                ${true}
        `
    ("isVisible", ({attribute, expected}) => {
        expect(AttributeHelper.isVisible(attribute)).toBe(expected)
    })
})