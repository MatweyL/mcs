import {ActionProcessor} from "../action_processor";
import Actions from "../../../../constants/actions";
import Attributes from "../../../../constants/attributes";
import {navigator} from "../../../../navigator";

export class SelectActionProcessor extends ActionProcessor {
    process(state, action) {
        const attribute = state.attributes[state.selectedAttribute];
        if (attribute.type === Attributes.MENU_ITEM) {
            // FIXME: побочные эффекты не влияющие на состояние лучше перенести
            navigator.push(attribute.value);

            return {...state}
        }
        return state;
    }

    getType() {
        return Actions.SELECT;
    }
}