import {actionProcessorRegistry} from "../../di";

const defaultState = {
    attributes: {}
};

export const screenReducer = (state = defaultState, action) => {
    return actionProcessorRegistry.process(state, action);
}