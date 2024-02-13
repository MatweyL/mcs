import Buttons from "../../../../../constants/buttons";
import Actions from "../../../../../constants/actions";
import {ActionProcessor} from "../action_processor";

export class OpenSelectBoxActionProcessor extends ActionProcessor {
    process(state, action) {
        const attribute = action.payload;
        attribute.open = true;
        attribute.dictionaryValues[0].active = true;
        state.attributes = {...state.attributes, [attribute.name]: attribute};

        state.buttons.rightButton = Buttons.CLOSE_SELECT_BOX_BUTTON;
        state.buttons.leftButton = Buttons.SAVE_SELECTED_BUTTON;

        return {...state};
    }

    getType() {
        return Actions.OPEN_SELECT_BOX;
    }
}