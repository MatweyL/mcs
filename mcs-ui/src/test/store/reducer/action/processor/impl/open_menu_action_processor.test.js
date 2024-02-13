import {OpenMenuActionProcessor} from "../../../../../../core/store/screen/action/processor/impl/open_menu_action_processor";
import Buttons from "../../../../../../core/constants/buttons";
import Actions from "../../../../../../core/constants/actions";

describe('OpenMenuActionProcessor', () => {
    const processor = new OpenMenuActionProcessor();

    test('должен добавлять открытую мультикнопку и кнопку для закрытия меню', () => {
        // GIVEN
        const state = {
            buttons: {}
        }

        // WHEN
        const actualState = processor.process(state);

        // THEN
        expect(actualState).not.toBe(state);
        expect(actualState.buttons.leftButton).toBe(Buttons.MULTISELECT_BUTTON);
        expect(actualState.buttons.leftButton.open).toBeTruthy();
        expect(actualState.buttons.rightButton).toBe(Buttons.CLOSE_MENU_BUTTON);
    })

    test('должен возвращать верный тип действия', () => {
        expect(processor.getType()).toBe(Actions.OPEN_MENU)
    })
})
