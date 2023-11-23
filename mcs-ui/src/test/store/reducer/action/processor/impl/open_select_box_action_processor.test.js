import Actions from "../../../../../../store/constants/actions";
import {OpenSelectBoxActionProcessor} from "../../../../../../store/reducer/action/processor/impl/open_select_box_action_processor.js";
import Buttons from "../../../../../../store/constants/buttons";

describe('OpenSelectBoxActionProcessor', () => {
    const processor = new OpenSelectBoxActionProcessor();

    test('должен выполнять открытие selectBox', () => {
        // GIVEN
        const selectBox = {
            open: false,
            dictionaryValues: [
                {active: false},
                {active: false}
            ]
        }

        const state = {
            attributes: {
                ATTRIBUTE: selectBox
            },
            selectedAttribute: 'ATTRIBUTE',
            buttons: {}
        }

        // WHEN
        const actualState = processor.process(state, {payload: selectBox});

        // THEN
        expect(actualState).not.toBe(state);

        const actualSelectBox = actualState.attributes.ATTRIBUTE;
        expect(actualSelectBox).toBeTruthy();
        expect(actualSelectBox.dictionaryValues[0].active).toBeTruthy();

        expect(actualState.buttons.rightButton).toBe(Buttons.CLOSE_SELECT_BOX_BUTTON);
        expect(actualState.buttons.leftButton).toBe(Buttons.SAVE_SELECTED_BUTTON);
    })

    test('должен возвращать верный тип действия', () => {
        expect(processor.getType()).toBe(Actions.OPEN_SELECT_BOX)
    })
})
