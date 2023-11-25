import Instructions from "../../../../store/constants/instructions";
import Attributes from "../../../../store/constants/attributes";

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

    test('SHOW показывает атрибут', () => {
        // GIVEN
        const attribute = {
            visible: false,
            value: null
        }

        // WHEN
        Instructions['SHOW'](attribute);

        // THEN
        expect(attribute.visible).toBeTruthy();
        expect(attribute.value).toBeNull();
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