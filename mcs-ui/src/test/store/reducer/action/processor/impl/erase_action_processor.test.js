import Actions from "../../../../../../core/constants/actions";
import {EraseActionProcessor} from "../../../../../../core/store/screen/action/processor/impl/erase_action_processor";

describe('EraseActionProcessor', () => {
    const processor = new EraseActionProcessor();

    test.each`
    previous  | expected
    ${"123"}  | ${"12"}
    ${""}     | ${""}
    ${null}   | ${""}
    `('должен стирать последний символ', ({previous, expected}) => {
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
        expect(processor.getType()).toBe(Actions.ERASE)
    })
})
