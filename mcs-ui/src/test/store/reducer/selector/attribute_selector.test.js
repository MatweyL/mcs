import {ButtonsFactory} from "../../../../core/store/screen/button/buttons_factory";
import {AttributeSelector} from "../../../../core/store/screen/selector/attribute_selector";
import Actions from "../../../../core/constants/actions";

describe('AttributeSelector', () => {
    const updater = new ButtonsFactory();
    const mockMethod = jest.fn();
    const calculator = {calculateNextByDirection: mockMethod}
    const clipper = {clip: jest.fn()};
    const selector = new AttributeSelector(updater, calculator, clipper);

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
        selector.select(state, 'PREVIOUS', Actions.UP);

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
        selector.select(state, 'PREVIOUS', Actions.UP);

        // THEN
        expect(state.selectedAttribute).toBe('NEXT_VISIBLE');
        expect(state.attributes['PREVIOUS'].active).toBeFalsy();
        expect(state.attributes['NEXT_NOT_VISIBLE'].active).toBeFalsy();
        expect(state.attributes['NEXT_VISIBLE'].active).toBeTruthy();
    })

    // FIXME: Возможно сделать интеграционные тесты с clipper'ом
    // test('должен обрезать атрибуты, к-е не помещаются на экран', () => {
    //     // GIVEN
    //     mockMethod.mockReturnValue(4);
    //
    //     const state = {
    //         selectedAttribute: 'THIRD',
    //         attributes: {
    //             FIRST: {
    //                 visible: true,
    //                 name: 'FIRST'
    //             },
    //             SECOND: {
    //                 visible: true,
    //                 name: 'SECOND'
    //             },
    //             SECOND_HALF: {
    //                 visible: false,
    //                 name: 'SECOND_HALF'
    //             },
    //             THIRD: {
    //                 visible: true,
    //                 name: 'THIRD'
    //             },
    //             FOURTH: {
    //                 visible: true,
    //                 name: 'FOURTH',
    //                 clipped: true
    //             }
    //         },
    //         buttons: {}
    //     }
    //
    //     // WHEN
    //     selector.select(state, 'THIRD', Actions.DOWN, 3);
    //
    //     // THEN
    //     expect(state.selectedAttribute).toBe('FOURTH');
    //     expect(state.attributes['FIRST'].active).toBeFalsy();
    //     expect(state.attributes['SECOND'].active).toBeFalsy();
    //     expect(state.attributes['THIRD'].active).toBeFalsy();
    //
    //     expect(state.attributes['FIRST'].visible).toBeTruthy();
    //     expect(state.attributes['SECOND'].visible).toBeTruthy();
    //     expect(state.attributes['SECOND_HALF'].visible).toBeFalsy();
    //     expect(state.attributes['THIRD'].visible).toBeTruthy();
    //
    //     expect(state.attributes['FIRST'].clipped).toBeTruthy();
    //     expect(state.attributes['SECOND'].clipped).toBeTruthy();
    //     expect(state.attributes['SECOND_HALF'].clipped).toBeFalsy();
    //     expect(state.attributes['THIRD'].clipped).toBeTruthy();
    //
    //     expect(state.attributes['FOURTH'].active).toBeTruthy();
    // })
    //
    // test('должен вызываться всегда', () => {
    //     expect(selector.shouldCall(null, null)).toBeTruthy()
    // })
})