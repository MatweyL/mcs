import {actionProcessorRegistry} from "../../di";

const defaultState = {
    attributes: {},
    name: null
};

export const screenReducer = (state = defaultState, action) => {
    return actionProcessorRegistry.process(state, action);
}