import {ActionProcessor} from "../action_processor";
import Actions from "../../../../../constants/actions";
import Attributes from "../../../../../constants/attributes";
import AttributeHelper from "../../../../helper/attribute_helper";

// Величина задержки, после которой добавляется новый символ, в мс
const DIFF_TIME = 1000;

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

        const keys = action.payload;
        const {lastPressedKey, lastTimePressed} = state;

        if (!keys.includes(lastPressedKey)) {
            nowAttribute.value = AttributeHelper.getTextValueOrEmpty(nowAttribute) + keys[0];
            state.lastPressedKey = keys[0];
        } else if (Date.now() - lastTimePressed >= DIFF_TIME) {
            nowAttribute.value = AttributeHelper.getTextValueOrEmpty(nowAttribute) + keys[0];
            state.lastPressedKey = keys[0];
        } else {
            const nowIndex = keys.findIndex(key => lastPressedKey === key);
            const nextIndex = this.calculator.calculateNextByDirection(Actions.DOWN, nowIndex, keys.length);
            nowAttribute.value = AttributeHelper.getTextValueOrEmpty(nowAttribute).slice(0, -1) + keys[nextIndex];
            state.lastPressedKey = keys[nextIndex];
        }

        state.lastTimePressed = Date.now();
        return {...state};
    }

    getType() {
        return Actions.PRESS_KEY;
    }
}