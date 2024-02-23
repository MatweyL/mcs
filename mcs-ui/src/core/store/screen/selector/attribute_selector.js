import {Selector} from "./selector";
import AttributeHelper from "../../helper/attribute_helper";

/**
 * Селектор атрибутов. Выделяет текущий атрибут
 */
export class AttributeSelector extends Selector {
    constructor(buttonsFactory, calculator, clipper) {
        super();
        this.buttonsFactory = buttonsFactory;
        this.calculator = calculator;
        this.clipper = clipper;
    }

    select(state, name, direction, pageSize = 7) {
        let names = Object.keys(state.attributes);
        let index = names.indexOf(name);

        let nextIndex = this.calculator.calculateNextByDirection(direction, index, names.length);
        let nextAttribute = Object.values(state.attributes).at(nextIndex);
        while (AttributeHelper.isNotVisible(nextAttribute)) {
            nextIndex = this.calculator.calculateNextByDirection(direction, nextIndex, names.length);
            nextAttribute = Object.values(state.attributes).at(nextIndex);
        }

        this._select(state, nextAttribute.name);
        this.clipper.clip(state.attributes, 200);
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