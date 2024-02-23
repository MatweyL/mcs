import {AttributeClipper} from "../../../../core/store/screen/selector/attribute_clipper";

describe('Clipper', () => {
    const clipper = new AttributeClipper();

    test('должен обрезать атрибуты, к-е не вмещаются на странице, если выбранный атрибут в самом конце страницы', () => {
        // GIVEN
        const screenHeight = 30;
        const attributes = {
            1: {height: 10},
            2: {height: 10},
            3: {height: 10},
            4: {height: 10},
            5: {height: 10, active: true}
        }

        // WHEN
        clipper.clip(attributes, screenHeight);

        // THEN
        const expected = {
            1: {height: 10, clipped: true, acc: 10},
            2: {height: 10, clipped: true, acc: 20},
            3: {height: 10, clipped: true, acc: 30},
            4: {height: 10, clipped: false, acc: 40},
            5: {height: 10, clipped: false, active: true, acc: 50}
        }
        expect(attributes).toEqual(expected)
    })

    test('должен обрезать атрибуты, к-е не вмещаются на странице, если выбранный атрибут посередине', () => {
        // GIVEN
        const screenHeight = 30;
        const attributes = {
            1: {height: 10, clipped: true},
            2: {height: 10, clipped: true},
            3: {height: 10, active: true},
            4: {height: 10, clipped: false}
        }

        // WHEN
        clipper.clip(attributes, screenHeight);

        // THEN
        const expected = {
            1: {height: 10, clipped: false, acc: 10},
            2: {height: 10, clipped: false, acc: 20},
            3: {height: 10, clipped: false, active: true, acc: 30},
            4: {height: 10, clipped: false, acc: 40}
        }
        expect(attributes).toEqual(expected)
    })

    test('должен обрезать атрибуты, к-е не вмещаются на странице, если выбранный атрибут в начале страницы', () => {
        // GIVEN
        const screenHeight = 30;
        const attributes = {
            1: {height: 10, clipped: true},
            2: {height: 10, clipped: true},
            3: {height: 10, clipped: true},
            4: {height: 10, active: true}
        }

        // WHEN
        clipper.clip(attributes, screenHeight);

        // THEN
        const expected = {
            1: {height: 10, clipped: true, acc: 10},
            2: {height: 10, clipped: true, acc: 20},
            3: {height: 10, clipped: true, acc: 30},
            4: {height: 10, clipped: false, active: true, acc: 40}
        }
        expect(attributes).toEqual(expected)
    })

    test('должен обрезать атрибуты, к-е не вмещаются на странице, если выбранный атрибут вмещается на последнюю страницу', () => {
        // GIVEN
        const screenHeight = 20;
        const attributes = {
            1: {height: 10, clipped: false},
            2: {height: 10, clipped: false},
            3: {height: 10, clipped: false},
            4: {height: 10, clipped: false},
            5: {height: 10, clipped: false},
            6: {height: 10, active: true}
        }

        // WHEN
        clipper.clip(attributes, screenHeight);

        // THEN
        const expected = {
            1: {height: 10, clipped: true, acc: 10},
            2: {height: 10, clipped: true, acc: 20},
            3: {height: 10, clipped: true, acc: 30},
            4: {height: 10, clipped: true, acc: 40},
            5: {height: 10, clipped: false, acc: 50},
            6: {height: 10, clipped: false, active: true, acc: 60}
        }
        expect(attributes).toEqual(expected)
    })

    test('должен возвращать все атрибуты, если выбранный атрибут в самом верху', () => {
        // GIVEN
        const screenHeight = 20;
        const attributes = {
            1: {height: 10, clipped: true, active: true},
            2: {height: 10, clipped: true},
            3: {height: 10, clipped: true},
            4: {height: 10, clipped: true},
            5: {height: 10, clipped: false},
            6: {height: 10, clipped: false}
        }

        // WHEN
        clipper.clip(attributes, screenHeight);

        // THEN
        const expected = {
            1: {height: 10, clipped: false, acc: 10, active: true},
            2: {height: 10, clipped: false, acc: 20},
            3: {height: 10, clipped: false, acc: 30},
            4: {height: 10, clipped: false, acc: 40},
            5: {height: 10, clipped: false, acc: 50},
            6: {height: 10, clipped: false, acc: 60}
        }
        expect(attributes).toEqual(expected)
    })
})