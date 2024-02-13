import {ActionProcessor} from "../action_processor";
import Actions from "../../../../../constants/actions";
import AttributeHelper from "../../../../helper/attribute_helper";
import Instructions from "../../../../../constants/instructions";
import Attributes from "../../../../../constants/attributes";

const EMPTY = "";

export class InitActionProcessor extends ActionProcessor {
    constructor(buttonsFactory, eventProcessor) {
        super();
        this.buttonsFactory = buttonsFactory;
        this.eventProcessor = eventProcessor;
    }

    process(state, action) {
        const data = action.payload;
        this.initState(state, data);
        return {...state}
    }

    initState(state, data) {
        const {name, label, attributes} = data;

        state.label = label;
        state.name = name;
        state.attributes = this._processAttributes(attributes);

        const firstVisibleAttribute = this._findFirstVisibleAttribute(state.attributes);
        firstVisibleAttribute.active = true;

        state.selectedAttribute = firstVisibleAttribute.name;
        state.buttons = this.buttonsFactory.create(firstVisibleAttribute.type);
    }

    _processAttributes(attributes) {
        const processedAttributes = {...attributes};
        for (const attributeName of Object.keys(attributes)) {
            const attribute = processedAttributes[attributeName];
            attribute.name = attributeName;
            attribute.active = false;

            if (AttributeHelper.isVisible(attribute)) {
                Instructions.SHOW(attribute);
            }

            if (attribute.type === Attributes.TEXT) {
                attribute.value = EMPTY;
            }

            this.eventProcessor.process(attribute, processedAttributes)
        }

        return processedAttributes;
    }

    _findFirstVisibleAttribute(attributes) {
        return Object.values(attributes)
            .find(attribute => AttributeHelper.isVisible(attribute));
    }

    getType() {
        return Actions.INIT;
    }
}