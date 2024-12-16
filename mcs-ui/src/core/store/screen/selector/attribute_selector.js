import {Selector} from "./selector";
import AttributeHelper from "../../helper/attribute_helper";
import Attributes from "../../../constants/attributes";

const SCREEN_HEIGHT = 200;

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

    select(state, name, direction) {
        let names = Object.keys(state.attributes);
        let index = names.indexOf(name);

        let nextIndex = this.calculator.calculateNextByDirection(direction, index, names.length);
        let nextAttribute = Object.values(state.attributes).at(nextIndex);
        while (AttributeHelper.isNotVisible(nextAttribute) || !AttributeHelper.isClickable(nextAttribute)) {
            nextIndex = this.calculator.calculateNextByDirection(direction, nextIndex, names.length);
            nextAttribute = Object.values(state.attributes).at(nextIndex);
        }

        this._select(state, nextAttribute.name);
        this.clipper.clip(state.attributes, SCREEN_HEIGHT);
    }

    _select(state, name) {
        const prevName = state.selectedAttribute;
        const prevAttribute = state.attributes[prevName];
        prevAttribute.active = false;
        const nowAttribute = state.attributes[name];
        nowAttribute.active = true;

        // FIXME: Здесь не должно быть логики, связанной с типом конкретного атрибута
        if (prevAttribute.type === Attributes.SELECTABLE_CARD_ITEM) {
            prevAttribute.value = false;
            nowAttribute.value = true;
        }

        state.buttons = this.buttonsFactory.create(state.attributes[name].type);
        state.selectedAttribute = name;
    }

    shouldCall(state, name) {
        return true;
    }
}