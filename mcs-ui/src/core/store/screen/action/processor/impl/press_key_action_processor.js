import {ActionProcessor} from "../action_processor";
import Actions from "../../../../../constants/actions";
import Attributes from "../../../../../constants/attributes";
import AttributeHelper from "../../../../helper/attribute_helper";

// Величина задержки, после которой добавляется новый символ, в мс
const DIFF_TIME = 1000;
const NUM_KEYS = "0123456789";

export class PressKeyActionProcessor extends ActionProcessor {
    constructor(calculator) {
        super();
        this.calculator = calculator;
    }

    process(state, action) {
        const nowAttributeName = state.selectedAttribute;
        const nowAttribute = state.attributes[nowAttributeName];
        if (nowAttribute.type !== Attributes.TEXT) {
            return state;
        }

        const {lastPressedKey, lastTimePressed} = state;

        let keys = action.payload;
        if (nowAttribute.numeric) {
            keys = this._filterNumeric(keys);
        }

        if (!keys.includes(lastPressedKey)) {
            nowAttribute.value = AttributeHelper.getTextValueOrEmpty(nowAttribute) + keys[0];
            state.lastPressedKey = keys[0];
        } else if (Date.now() - lastTimePressed >= DIFF_TIME) {
            nowAttribute.value = AttributeHelper.getTextValueOrEmpty(nowAttribute) + keys[0];
            state.lastPressedKey = keys[0];
        } else {
            const nowIndex = keys.findIndex(key => lastPressedKey === key);
            const nextIndex = this.calculator.calculateNextByDirection(Actions.DOWN, nowIndex, keys.length);
            if (nowIndex !== nextIndex) {
                nowAttribute.value = AttributeHelper.getTextValueOrEmpty(nowAttribute).slice(0, -1) + keys[nextIndex];
            } else {
                nowAttribute.value = AttributeHelper.getTextValueOrEmpty(nowAttribute) + keys[nextIndex];
            }
            state.lastPressedKey = keys[nextIndex];
        }

        state.lastTimePressed = Date.now();
        return {...state};
    }

    _filterNumeric(keys) {
        return keys.filter(key => NUM_KEYS.includes(key))
    }

    getType() {
        return Actions.PRESS_KEY;
    }
}