import Actions from "../../../../constants/actions";
import {ActionProcessor} from "../action_processor";
import AttributeHelper from "../../../../helper/attribute_helper";

export class EraseActionProcessor extends ActionProcessor {

    process(state, action) {
        const attribute = state.attributes[state.selectedAttribute];
        attribute.value = AttributeHelper.getTextValueOrEmpty(attribute).slice(0, -1);
        return {...state, attributes: {...state.attributes, [attribute.name]: attribute}};
    }

    getType() {
        return Actions.ERASE;
    }
}