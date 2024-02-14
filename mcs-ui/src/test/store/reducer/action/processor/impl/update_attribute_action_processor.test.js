import Actions from "../../../../../../core/constants/actions";
import {
    UpdateAttributeActionProcessor
} from "../../../../../../core/store/screen/action/processor/impl/update_attribute_action_processor";

describe('UpdateAttributeActionProcessor', () => {
    const mockMethod = jest.fn();
    const eventProcessor = {process: mockMethod}
    const processor = new UpdateAttributeActionProcessor(eventProcessor);

    test('должен выполнять обновление переданного атрибута', () => {
        // GIVEN
        const NEW_ATTRIBUTE = {
            name: "ATTRIBUTE",
            value: false
        }

        const OLD_ATTRIBUTE = {
            name: "ATTRIBUTE",
            value: true
        }

        const state = {
            attributes: {
                ATTRIBUTE: OLD_ATTRIBUTE
            }
        }

        // WHEN
        const actualState = processor.process(state, {payload: NEW_ATTRIBUTE});

        // THEN
        expect(actualState).not.toBe(state);
        expect(actualState.attributes.ATTRIBUTE).toEqual(NEW_ATTRIBUTE)
        expect(actualState.attributes.ATTRIBUTE).not.toEqual(OLD_ATTRIBUTE)
    })

    test('должен возвращать верный тип действия', () => {
        expect(processor.getType()).toBe(Actions.UPDATE_ATTRIBUTE)
    })
})
