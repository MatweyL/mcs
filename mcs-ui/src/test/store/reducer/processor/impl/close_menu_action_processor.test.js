import Buttons from "../../../../../store/constants/buttons";
import Actions from "../../../../../store/constants/actions";
import {CloseMenuActionProcessor} from "../../../../../store/reducer/processor/impl/close_menu_action_processor";

describe('CloseMenuActionProcessor', () => {
    const processor = new CloseMenuActionProcessor();

    test('должен добавлять скрытую кнопку для открытия меню и кнопку "Назад"', () => {
        // GIVEN
        const state = {
            buttons: {}
        }

        // WHEN
        const actualState = processor.process(state);

        // THEN
        expect(actualState).not.toBe(state);
        expect(actualState.buttons.leftButton).toBe(Buttons.OPEN_MENU_BUTTON);
        expect(actualState.buttons.leftButton.open).toBeFalsy();
        expect(actualState.buttons.rightButton).toBe(Buttons.RETURN_BACK_BUTTON);
    })

    test('должен возвращать верный тип действия', () => {
        expect(processor.getType()).toBe(Actions.CLOSE_MENU)
    })
})
