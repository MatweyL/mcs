import {EditActionProcessor} from "../../../store/reducer/edit_action_processor";

describe('EditActionProcessor', () => {
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
        let processor = new EditActionProcessor();
        const actualState = processor.process(state);

        // THEN
        expect(actualState).not.toEqual(state);
        expect(actualState.attributes.ATTRIBUTE.value).toBe(expected);
    })
})
