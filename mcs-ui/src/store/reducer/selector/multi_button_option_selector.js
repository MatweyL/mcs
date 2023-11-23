import {Selector} from "./selector";

export class MultiButtonOptionSelector extends Selector {
    constructor(calculator) {
        super();
        this.calculator = calculator;
    }

    select(state, name, direction) {
        const button = this.getOpenButton(state);
        const activeItemIndex = button.items.findIndex(item => item.active);
        button.items[activeItemIndex].active = false;
        let nextIndex = this.calculator.calculateNextByDirection(direction, activeItemIndex, button.items.length);
        button.items[nextIndex].active = true;
    }

    shouldCall(state, name) {
        return this.getOpenButton(state);
    }

    getOpenButton(state) {
        return Object.values(state.buttons)
            .find(button => button.open);
    }
}