import {SelectBoxOptionSelector} from "../../../../core/store/screen/selector/select_box_option_selector";
import Attributes from "../../../../core/constants/attributes";

describe('SelectBoxOptionSelector', () => {
    const mockMethod = jest.fn();
    const calculator = {calculateNextByDirection: mockMethod}
    const selector = new SelectBoxOptionSelector(calculator);

    test('должен выбирать следующую опцию selectBox', () => {
        // GIVEN
        mockMethod.mockReturnValue(2);

        const values = [
            {active: true},
            {active: false},
            {active: false},
        ]

        const selectBox = {
            dictionaryValues: values
        }

        const state = {
            attributes: {
                selectBox: selectBox
            }
        }

        // WHEN
        selector.select(state, 'selectBox', 'up');

        // THEN
        expect(values[0].active).toBeFalsy()
        expect(values[1].active).toBeFalsy()
        expect(values[2].active).toBeTruthy()
    })

    test('должен вызываться когда тип атрибута SELECT_BOX и он открыт', () => {
        // GIVEN
        const state = {
            attributes: {
                selectBox: {
                    open: true,
                    type: Attributes.SELECT_BOX
                }
            }
        }

        // WHEN | THEN
        expect(selector.shouldCall(state, 'selectBox')).toBeTruthy();
    })

    test('не должен вызываться, если тип атрибута SELECT_BOX, но он не открыт', () => {
        // GIVEN
        const state = {
            attributes: {
                selectBox: {
                    open: false,
                    type: Attributes.SELECT_BOX
                }
            }
        }

        // WHEN | THEN
        expect(selector.shouldCall(state, 'selectBox')).toBeFalsy();
    })
})