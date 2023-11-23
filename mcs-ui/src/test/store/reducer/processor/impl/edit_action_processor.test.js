import {EditActionProcessor} from "../../../../../store/reducer/processor/impl/edit_action_processor";
import Actions from "../../../../../store/constants/actions";

describe('EditActionProcessor', () => {
    const processor = new EditActionProcessor();

    test.each`
    previous | expected
    ${true}  | ${false}
    ${false} | ${true}
    `('должен изменять значение текущего атрибута на противоположное', ({previous, expected}) => {
        // GIVEN
        const state = {
            attributes: {
                ATTRIBUTE: {
                    value: previous
                }
            },
            selectedAttribute: 'ATTRIBUTE'
        }

        // WHEN
        const actualState = processor.process(state);

        // THEN
        expect(actualState).not.toEqual(state);
        expect(actualState.attributes.ATTRIBUTE.value).toBe(expected);
    })

    test('должен возвращать верный тип действия', () => {
        expect(processor.getType()).toBe(Actions.EDIT)
    })
})
