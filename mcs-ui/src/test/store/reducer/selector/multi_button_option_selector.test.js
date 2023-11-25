import {MultiButtonOptionSelector} from "../../../../store/reducer/selector/multi_button_option_selector";

describe('MultiButtonOptionSelector', () => {
    const mockMethod = jest.fn();
    const calculator = {calculateNextByDirection: mockMethod}
    const selector = new MultiButtonOptionSelector(calculator);

    test('должен выбирать следующую опцию кнопки', () => {
        // GIVEN
        mockMethod.mockReturnValue(2);

        const items = [
            {active: true},
            {active: false},
            {active: false},
        ]

        const state = {
            buttons: {
                leftButton: {
                    open: true,
                    items: items
                },
                rightButton: {
                    open: false
                }
            }
        }

        // WHEN
        selector.select(state, null, 'up');

        // THEN
        expect(items[0].active).toBeFalsy()
        expect(items[1].active).toBeFalsy()
        expect(items[2].active).toBeTruthy()
    });

    test('должен вызываться когда хотя бы одна кнопка открыта', () => {
        // GIVEN
        const state = {
            buttons: {
                leftButton: {
                    open: true,
                },
                rightButton: {
                    open: false
                }
            }
        }

        // WHEN | THEN
        expect(selector.shouldCall(state, null)).toBeTruthy();
    })

    test('не должен вызываться когда ни одна кнопка не открыта', () => {
        // GIVEN
        const state = {
            buttons: {
                leftButton: {
                    open: false,
                },
                rightButton: {
                    open: false
                }
            }
        }

        // WHEN | THEN
        expect(selector.shouldCall(state, null)).toBeFalsy();
    })
})