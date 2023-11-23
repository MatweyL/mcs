import Actions from "../../../constants/actions";
import Buttons from "../../../constants/buttons";
import {ActionProcessor} from "../action_processor";

export class OpenMenuActionProcessor extends ActionProcessor {
    process(state, action) {
        state.buttons.leftButton = Buttons.MULTISELECT_BUTTON;
        state.buttons.leftButton.open = true;
        state.buttons.rightButton = Buttons.CLOSE_MENU_BUTTON;
        return {...state}
    }

    getType() {
        return Actions.OPEN_MENU;
    }
}