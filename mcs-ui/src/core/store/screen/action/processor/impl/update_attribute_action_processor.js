import {ActionProcessor} from "../action_processor";
import Actions from "../../../../../constants/actions";
import {convertState} from "../../../../util";

export class UpdateAttributeActionProcessor extends ActionProcessor {
    constructor(eventProcessor) {
        super();
        this.eventProcessor = eventProcessor;
    }

    process(state, action) {
        const attribute = action.payload;
        console.log("Call update attribute on screen", attribute.name)
        this.eventProcessor.process(attribute, state.attributes);
        state.attributes = {...state.attributes, [attribute.name]: attribute};
        const updatedState = {...state};
        this._logState(updatedState);
        return updatedState;
    }

    _logState(state)  {
        console.log("ТЕКУЩЕЕ СОСТОЯНИЕ ФОРМЫ:", convertState(state));
    }

    getType() {
        return Actions.UPDATE_ATTRIBUTE;
    }
}