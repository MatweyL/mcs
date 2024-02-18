import {ActionProcessor} from "../action_processor";
import Actions from "../../../../../constants/actions";

export class OpenScreenSessionActionProcessor extends ActionProcessor {

    process(state, action) {
        state.sessionId = action.payload.sessionId;
        return {...state};
    }

    getType() {
        return Actions.OPEN_SCREEN_SESSION;
    }
}