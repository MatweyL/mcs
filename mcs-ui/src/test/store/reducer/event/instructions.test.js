import Instructions from "../../../../core/constants/instructions";
import Attributes from "../../../../core/constants/attributes";

describe('Instructions', () => {
    test('HIDE скрывает атрибут и сбрасывает значение', () => {
        // GIVEN
        const attribute = {
            visible: true,
            value: true
        }

        // WHEN
        Instructions['HIDE'](attribute);

        // THEN
        expect(attribute.visible).toBeFalsy();
        expect(attribute.value).toBeNull();
    });

    test('SHOW показывает атрибут и ставит дефолтное, если value == null', () => {
        // GIVEN
        const attribute = {
            visible: false,
            value: null,
            defaultValue: '5'
        }

        // WHEN
        Instructions['SHOW'](attribute);

        // THEN
        expect(attribute.visible).toBeTruthy();
        expect(attribute.value).toBe('5');
    })

    test('SHOW показывает атрибут и ставит value != null', () => {
        // GIVEN
        const attribute = {
            visible: false,
            value: '11',
            defaultValue: '5'
        }

        // WHEN
        Instructions['SHOW'](attribute);

        // THEN
        expect(attribute.visible).toBeTruthy();
        expect(attribute.value).toBe('11');
    })

    test(`SHOW показывает атрибут и устанавливает 
    значение по умолчанию, если атрибут selectBox`, () => {
        // GIVEN
        const attribute = {
            visible: false,
            value: null,
            defaultValue: 'value',
            type: Attributes.SELECT_BOX
        }

        // WHEN
        Instructions['SHOW'](attribute);

        // THEN
        expect(attribute.visible).toBeTruthy();
        expect(attribute.value).toBe('value');
    })
})