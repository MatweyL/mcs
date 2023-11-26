import Actions from "../../../../constants/actions";
import {ActionProcessor} from "../action_processor";

const EMPTY = "";

export class EraseActionProcessor extends ActionProcessor {

    process(state, action) {
        const attribute = state.attributes[state.selectedAttribute];
        const value = attribute.value ? attribute.value : EMPTY;
        attribute.value = value.slice(0, -1);
        return {...state, attributes: {...state.attributes, [attribute.name]: attribute}};
    }

    getType() {
        return Actions.ERASE;
    }
}