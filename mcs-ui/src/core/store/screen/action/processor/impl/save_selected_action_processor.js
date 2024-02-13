import {ActionProcessor} from "../action_processor";
import Actions from "../../../../../constants/actions";
import Buttons from "../../../../../constants/buttons";

export class SaveSelectedActionProcessor extends ActionProcessor {
    constructor(eventProcessor) {
        super();
        this.eventProcessor = eventProcessor;
    }
    process(state, action) {
        const attribute = action.payload;
        const activeValue = attribute.dictionaryValues
            .find(dictValue => dictValue.active);

        attribute.value = activeValue.value;
        attribute.open = false;

        Object.values(attribute.dictionaryValues)
            .forEach(value => value.active = false);

        this.eventProcessor.process(attribute, state.attributes);
        state.attributes = {...state.attributes, [attribute.name]: attribute};

        state.buttons.rightButton = Buttons.OPEN_SELECT_BOX_BUTTON;
        state.buttons.leftButton = Buttons.SAVE_BUTTON;

        return {...state};
    }

    getType() {
        return Actions.SAVE_SELECTED;
    }
}