import {Selector} from "./selector";
import Attributes from "../../constants/attributes";

export class SelectBoxOptionSelector extends Selector {
    constructor(calculator) {
        super();
        this.calculator = calculator;
    }

    select(state, name, direction) {
        let values = state.attributes[name].dictionaryValues;
        const activeOptionIndex = values
            .findIndex(dictValue => dictValue.active);

        values[activeOptionIndex].active = false;
        let nextIndex = this.calculator
            .calculateNextByDirection(direction, activeOptionIndex, values.length);
        values[nextIndex].active = true;
    }


    shouldCall(state, name) {
        const nowAttribute = state.attributes[name];
        return nowAttribute.type === Attributes.SELECT_BOX
            && nowAttribute.open;
    }
}