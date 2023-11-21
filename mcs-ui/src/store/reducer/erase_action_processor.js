import Actions from "../constants/actions";

class EraseActionProcessor extends ActionProcessor {
    process(state, action) {
        const attribute = state.attributes[state.selectedAttribute];
        attribute.value = attribute.value.slice(0, -1);
        return {...state, attributes: {...state.attributes, [attribute.name]: attribute}};
    }

    getType() {
        return Actions.ERASE;
    }
}