import Actions from "../../../../../../store/constants/actions";
import {CloseSelectBoxActionProcessor} from "../../../../../../store/reducer/action/processor/impl/close_select_box_action_processor";
import Buttons from "../../../../../../store/constants/buttons";

describe('CloseSelectBoxActionProcessor', () => {
    const processor = new CloseSelectBoxActionProcessor();

    test('должен закрывать selectBox', () => {
        // GIVEN
        const selectBox = {
            open: true,
            dictionaryValues: [
                {active: true},
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
        expect(actualSelectBox.open).toBeFalsy();
        expect(actualSelectBox.dictionaryValues.map(v => v.active)).not.toContain(true);

        expect(actualState.buttons.rightButton).toBe(Buttons.OPEN_SELECT_BOX_BUTTON);
        expect(actualState.buttons.leftButton).toBe(Buttons.SAVE_BUTTON);
    })

    test('должен возвращать верный тип действия', () => {
        expect(processor.getType()).toBe(Actions.CLOSE_SELECT_BOX)
    })
})
