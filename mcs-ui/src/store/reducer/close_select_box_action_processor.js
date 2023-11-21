import Buttons from "../constants/buttons";
import Actions from "../constants/actions";
import {ActionProcessor} from "./action_processor";

export class CloseSelectBoxActionProcessor extends ActionProcessor {
    process(state, action) {
        const attribute = action.payload;
        attribute.open = false;
        Object.values(attribute.dictionaryValues)
            .forEach(value => value.active = false);

        state.attributes = {...state.attributes, [attribute.name]: attribute};

        state.buttons.rightButton = Buttons.OPEN_SELECT_BOX_BUTTON;
        state.buttons.leftButton = Buttons.SAVE_BUTTON;

        return {...state};
    }

    getType() {
        return Actions.CLOSE_SELECT_BOX;
    }
}