import Actions from "../../../../constants/actions";
import {ActionProcessor} from "../action_processor";

export class EditActionProcessor extends ActionProcessor {
    process(state, action) {
        const attribute = action.payload;
        attribute.value = !attribute.value;
        return {...state, attributes: {...state.attributes, [attribute.name]: attribute}};
    }

    getType() {
        return Actions.EDIT;
    }
}