import Actions from "../../../../constants/actions";
import Buttons from "../../../../constants/buttons";
import {ActionProcessor} from "../action_processor";

export class CloseMenuActionProcessor extends ActionProcessor {
    process(state, action) {
        state.buttons.leftButton = Buttons.OPEN_MENU_BUTTON;
        state.buttons.leftButton.open = false;
        state.buttons.rightButton = Buttons.RETURN_BACK_BUTTON;
        return {...state}
    }

    getType() {
        return Actions.CLOSE_MENU;
    }
}