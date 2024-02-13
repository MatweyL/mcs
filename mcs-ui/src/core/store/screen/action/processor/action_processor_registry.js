export class ActionProcessorRegistry {
    constructor(processors) {
        this.processors = processors;
    }

    process(state, action) {
        console.log(`Process - ${action.type}`);

        const processor = this.processors.find(p => p.getType() === action.type);
        if (!processor) {
            return state;
        }

        const updatedState = JSON.parse(JSON.stringify(state));

        return processor
            .process(updatedState, action);
    }
}