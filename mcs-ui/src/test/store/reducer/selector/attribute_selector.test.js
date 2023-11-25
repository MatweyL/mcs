import {ButtonsFactory} from "../../../../store/reducer/button/buttons_updater";
import {AttributeSelector} from "../../../../store/reducer/selector/attribute_selector";

describe('AttributeSelector', () => {
    const updater = new ButtonsFactory();
    const mockMethod = jest.fn();
    const calculator = {calculateNextByDirection: mockMethod}
    const selector = new AttributeSelector(updater, calculator);

    test('должен выбирать переданный атрибут', () => {
        // GIVEN
        mockMethod.mockReturnValue(1);

        const state = {
            selectedAttribute: 'PREVIOUS',
            attributes: {
                PREVIOUS: {},
                NEXT: {
                    visible: true,
                    name: 'NEXT'
                }
            },
            buttons: {}
        }

        // WHEN
        selector.select(state, 'PREVIOUS', 'up');

        // THEN
        expect(state.selectedAttribute).toBe('NEXT');
        expect(state.attributes['NEXT'].active).toBeTruthy();
        expect(state.attributes['PREVIOUS'].active).toBeFalsy();
    })

    test('должен выбирать атрибут пока он не будет видим', () => {
        // GIVEN
        mockMethod.mockReturnValue(1).mockReturnValue(2);

        const state = {
            selectedAttribute: 'PREVIOUS',
            attributes: {
                PREVIOUS: {},
                NEXT_NOT_VISIBLE: {},
                NEXT_VISIBLE: {
                    visible: true,
                    name: 'NEXT_VISIBLE'
                }
            },
            buttons: {}
        }

        // WHEN
        selector.select(state, 'PREVIOUS', 'up');

        // THEN
        expect(state.selectedAttribute).toBe('NEXT_VISIBLE');
        expect(state.attributes['PREVIOUS'].active).toBeFalsy();
        expect(state.attributes['NEXT_NOT_VISIBLE'].active).toBeFalsy();
        expect(state.attributes['NEXT_VISIBLE'].active).toBeTruthy();
    })

    test('должен вызываться всегда', () => {
        expect(selector.shouldCall(null, null)).toBeTruthy()
    })
})