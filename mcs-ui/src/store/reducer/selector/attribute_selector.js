import {Selector} from "./selector";
import AttributeHelper from "../../helper/attribute_helper";

export class AttributeSelector extends Selector {
    constructor(buttonsFactory, calculator) {
        super();
        this.buttonsFactory = buttonsFactory;
        this.calculator = calculator;
    }

    select(state, name, direction) {
        let names = Object.keys(state.attributes);
        let index = names.indexOf(name);

        let nextIndex = this.calculator.calculateNextByDirection(direction, index, names.length);
        console.log("Next index:", nextIndex, " index:", index);
        let nextAttribute = Object.values(state.attributes).at(nextIndex);
        while (AttributeHelper.isNotVisible(nextAttribute)) {
            nextIndex = this.calculator.calculateNextByDirection(direction, nextIndex, names.length);
            nextAttribute = Object.values(state.attributes).at(nextIndex);
        }
        this._select(state, nextAttribute.name);
    }

    _select(state, name) {
        const prevName = state.selectedAttribute;
        state.attributes[prevName].active = false;
        state.attributes[name].active = true;
        state.buttons = this.buttonsFactory.create(state.attributes[name].type);
        state.selectedAttribute = name;
    }

    shouldCall(state, name) {
        return true;
    }
}