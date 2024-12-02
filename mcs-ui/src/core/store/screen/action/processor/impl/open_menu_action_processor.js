import Actions from "../../../../../constants/actions";
import Buttons from "../../../../../constants/buttons";
import {ActionProcessor} from "../action_processor";
import Button from "../../../../../../components/attributes/Button";

export class OpenMenuActionProcessor extends ActionProcessor {
    process(state, action) {
        const nowAttributeName = state.selectedAttribute;
        const nowAttribute = state.attributes[nowAttributeName];

        state.buttons.leftButton = this._getLeftButtons(nowAttribute.default);
        state.buttons.leftButton.open = true;
        state.buttons.rightButton = Buttons.CLOSE_MENU_BUTTON;

        return {...state}
    }

    _getLeftButtons(empty) {
        let button = {...Buttons.MULTISELECT_BUTTON};
        if (!empty) {
            return button
        }

        const items = [...Buttons.MULTISELECT_BUTTON.items]

        button.items[0].active = false;
        button.items[1].active = true;
        button.items[2].active = false;

        return button;
    }

    getType() {
        return Actions.OPEN_MENU;
    }
}