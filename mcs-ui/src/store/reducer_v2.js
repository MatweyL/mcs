import {actionProcessorRegistry} from "./reducer/action/processor/action_processor_registry";

export const reducer_v2 = (state, action) => {
    return actionProcessorRegistry.process(state, action);
}