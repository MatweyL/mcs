import Actions from "../../../../../../store/constants/actions";
import Buttons from "../../../../../../store/constants/buttons";
import {
    SaveSelectedActionProcessor
} from "../../../../../../store/reducer/action/processor/impl/save_selected_action_processor";

describe('SaveSelectedActionProcessor', () => {
    const mockMethod = jest.fn();
    const eventProcessor = {process: mockMethod}
    const processor = new SaveSelectedActionProcessor(eventProcessor);

    test('должен выполнять сохранение выбранного значения в selectBox', () => {
        // GIVEN
        const selectBox = {
            name: "JUST_SELECT_BOX",
            value: null,
            open: true,
            dictionaryValues: [
                {
                    value: 'FIRST',
                    active: true,
                },
                {
                    value: 'SECOND',
                    active: false,
                }
            ]
        }

        const state = {
            attributes: {
                JUST_SELECT_BOX: selectBox
            },
            selectedAttribute: 'JUST_SELECT_BOX',
            buttons: {}
        }

        // WHEN
        const actualState = processor.process(state, {payload: selectBox});

        // THEN
        expect(actualState).not.toBe(state);

        const actualSelectBox = actualState.attributes.JUST_SELECT_BOX;
        expect(actualSelectBox.open).toBeFalsy()
        expect(actualSelectBox.dictionaryValues[0].active).toBeFalsy();
        expect(actualSelectBox.dictionaryValues[1].active).toBeFalsy();
        expect(actualSelectBox.value).toBe('FIRST');

        expect(actualState.buttons.rightButton).toBe(Buttons.OPEN_SELECT_BOX_BUTTON);
        expect(actualState.buttons.leftButton).toBe(Buttons.SAVE_BUTTON);
    })

    test('должен возвращать верный тип действия', () => {
        expect(processor.getType()).toBe(Actions.SAVE_SELECTED)
    })
})
