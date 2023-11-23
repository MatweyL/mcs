import Actions from "../../../constants/actions";
import {ActionProcessor} from "../action_processor";

export class EditActionProcessor extends ActionProcessor {

    process(state, action) {
        console.log(action?.payload);
        const attribute = state.attributes[state.selectedAttribute];
        attribute.value = !attribute.value;
        return {...state, attributes: {...state.attributes, [attribute.name]: attribute}};
    }

    getType() {
        return Actions.EDIT;
    }
}