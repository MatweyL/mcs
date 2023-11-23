import Actions from "../../../../constants/actions";
import {ActionProcessor} from "../action_processor";

export class OpenActionProcessor extends ActionProcessor {

    process(state, action) {

    }

    getType() {
        return Actions.OPEN;
    }
}