import {actionProcessorRegistry} from "./action/processor/action_processor_registry";

const defaultState = {
    attributes: {}
};

export const screenReducer = (state = defaultState, action) => {
    return actionProcessorRegistry.process(state, action);
}