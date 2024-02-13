import {actionProcessorRegistry} from "./reducer/action/processor/action_processor_registry";

const defaultState = {
    attributes: {}
};

export const reducer_v2 = (state = defaultState, action) => {
    return actionProcessorRegistry.process(state, action);
}