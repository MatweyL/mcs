import {ActionProcessor} from "../action_processor";

export class DirectionActionProcessor extends ActionProcessor {
    constructor(selectors) {
        super();
        this.selectors = selectors;
    }

    process(state, action) {
        const name = action.payload;
        this.selectors.find(s => s.shouldCall(state, name))
            .select(state, name, this.getType());
        return {...state};
    }
}