import Actions from "../../../../../../core/constants/actions";
import {
    PressKeyActionProcessor
} from "../../../../../../core/store/screen/action/processor/impl/press_key_action_processor";

describe('PressKeyActionProcessor', () => {
    const processor = new PressKeyActionProcessor();

    test('должен добавлять текст в поле', () => {
        // GIVEN
        const state = {
            selectedAttribute: "TEXT",
            attributes: {
                TEXT: {
                    type: "TEXT"
                }
            }
        }

        const action = {payload: ["1", "2", "3"]}

        // WHEN
        const actualState = processor.process(state, action);

        // THEN
        expect(actualState.lastPressedKey).toBe("1");
        expect(actualState.attributes.TEXT.value).toBe("1");
        expect(actualState.lastTimePressed).not.toBeNull();
    })

    test('ничего не делает, если атрибут не текстовый', () => {
        // GIVEN
        const state = {
            selectedAttribute: "ATTRIBUTE",
            attributes: {
                TEXT: {
                    type: "TEXT"
                },
                ATTRIBUTE: {
                    type: "NOT_TEXT"
                }
            }
        }

        // WHEN
        const actualState = processor.process(state);

        // THEN
        expect(actualState).toBe(state);
    })

    test('должен возвращать верный тип действия', () => {
        expect(processor.getType()).toBe(Actions.PRESS_KEY)
    })
})
