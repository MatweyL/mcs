import {navigator} from "./navigator";
import {BACK, DOWN, EDIT, ERASE, INIT, MENU, SAVE, SELECT, UP, UPDATE_ATTRIBUTE} from "./constants";

/// TODO: Чуть позже зарефакторить, разбить большое полотно методов на части
/// Reducer - описывает преобразование состояния
/// на основе данных в action
export const reducer = (state, action) => {
    switch (action.type) {
        case INIT: {
            const data = action.payload;
            console.log("DATA IN REDUCER", data);
            updateScreen(state, data);
            Object.keys(state.attributes).slice(1)
                .forEach(name => state.attributes[name].active = false);
            state.selectedAttribute = Object.keys(state.attributes)[0];
            state.attributes[state.selectedAttribute].active = true;
            state.label = data.label;
            navigator.push(data.name);
            return {...state}
        }

        case UPDATE_ATTRIBUTE: {
            const attribute = action.payload;
            console.log("Call update attribute on screen", attribute.name)
            processEvents(attribute, state.attributes);
            state.attributes = {...state.attributes, [attribute.name]: attribute};
            const updatedState = {...state};
            logState(updatedState);
            return updatedState;
        }

        case UP: {
            selectNext(state,
                action.payload,
                "up",
                (index, names) => index === 0 ? names.length - 1 : (index - 1) % names.length)
            return {...state};
        }

        case DOWN: {
            selectNext(state,
                action.payload,
                "down",
                (index, names) => (index + 1) % names.length)
            return {...state};
        }

        case SELECT: {
            const attribute = state.attributes[state.selectedAttribute];
            if (attribute.type === "MENU_ITEM") {
                navigator.push(attribute.value);

                return {...state}
            }
            return state;
        }

        case EDIT: {
            console.log(action.payload);
            const attribute = state.attributes[state.selectedAttribute];
            attribute.value = !attribute.value;
            return {...state, attributes: {...state.attributes, [attribute.name]: attribute}};
        }

        case ERASE: {
            const attribute = state.attributes[state.selectedAttribute];
            attribute.value = attribute.value.slice(0, -1);
            return {...state, attributes: {...state.attributes, [attribute.name]: attribute}};
        }
        default:
            return state;
    }
}

const updateScreen = (state, data) => {
    console.log("FILL ATTRIBUTES")
    fillAttributes(state, data.attributes);
}

const logState = (state) => {
    const attributesState = {};
    Object.keys(state.attributes)
        .forEach(name => attributesState[name] = state.attributes[name].value);
    console.log("ТЕКУЩЕЕ СОСТОЯНИЕ ФОРМЫ:", attributesState);
}

const fillButtons = (buttons) => {
    Object.keys(buttons).forEach(name => {
            buttons[name].name = name;
        }
    )
}

const fillAttributes = (state, attributes) => {
    console.log(attributes);
    Object.keys(attributes).forEach(name => {
        attributes[name].name = name;
        attributes[name].selected = false;
        processEvents(attributes[name], attributes);
        if (attributes[name].visible === undefined) {
            attributes[name].visible = true;
        }
    });
    state.attributes = attributes;
}

const processEvents = (attribute, attributes) => {
    Object.keys(attributes)
        .forEach(attributeName => processAttributeEvents(attribute, attributes[attributeName]))
}

const processAttributeEvents = (updatedAttribute, linkedAttribute) => {
    let eventsToProcess = linkedAttribute.events?.filter(e => e.attribute === updatedAttribute.name);
    console.log("События для обработки", eventsToProcess);
    eventsToProcess?.forEach(e => processEvent(e, updatedAttribute, linkedAttribute));

}

const processEvent = (e, updatedAttribute, linkedAttribute) => {
    if (needProcess(e, updatedAttribute)) {
        e.instructions.forEach(i => compileInstruction(i, linkedAttribute));
    }
}

const compileInstruction = (i, linkedAttribute) => {
    console.log('Выполнение инструкции', i)
    TYPE_TO_INSTRUCTION[i](linkedAttribute);
}

const needProcess = (e, updatedAttribute) => {
    let firing = e.firingValues !== undefined && e.firingValues.includes(updatedAttribute.value)
    let excludeFiring = e.excludeFiringValues !== undefined && !e.excludeFiringValues.includes(updatedAttribute.value)

    console.log(firing, excludeFiring)

    return firing || excludeFiring;
}


const selectNext = (state, name, direction, calculateNext) => {
    let names = Object.keys(state.attributes);
    let index = names.indexOf(name);

    let nextIndex = calculateNext(index, names);
    console.log("Next index:", nextIndex, " index:", index);
    let nextAttribute = Object.values(state.attributes).at(nextIndex);
    while (!nextAttribute.visible) {
        nextIndex = calculateNext(nextIndex, names);
        nextAttribute = Object.values(state.attributes).at(nextIndex);
    }
    selectAttribute(state, nextAttribute.name);
    console.log(`Next - ${nextAttribute.name}`)
    console.log(direction);
}


const TYPE_TO_INSTRUCTION = {
    "SHOW": (a) => a.visible = true,
    "HIDE": hide,
}

function hide(attribute) {
    attribute.value = null;
    attribute.visible = false;
}

const selectAttribute = (state, name) => {
    const prevName = state.selectedAttribute;
    state.attributes[prevName].active = false;
    state.attributes[name].active = true;
    updateButtons(state.attributes[name].type, state);
    state.selectedAttribute = name;
}

const updateButtons = (selectedAttributeType, state) => {
    state.buttons = {
        leftButton: BUTTONS_PARAMS["LEFT"][selectedAttributeType],
        rightButton: BUTTONS_PARAMS["RIGHT"][selectedAttributeType]
    }
}

const SAVE_BUTTON_PARAMS = {name: SAVE, label: "Сохранить"}
const SELECT_BUTTON_PARAMS = {name: SELECT, label: "Выбрать"}
const BACK_BUTTON_PARAMS = {name: BACK, label: "Назад"}
const ERASE_BUTTON_PARAMS = {name: ERASE, label: "Стереть"}
const EDIT_BUTTON_PARAMS = {name: EDIT, label: "Изменить"}
const MENU_BUTTON_PARAMS = {name: MENU, label: "Меню"}

const SELECT_BOX = "DICTIONARY"
const TEXT = "TEXT"
const CHECKBOX = "BOOLEAN"
const MENU_ITEM = "MENU_ITEM"
const CARD_ITEM = "CARD_ITEM"

const BUTTONS_PARAMS = {
    "LEFT": {
        [SELECT_BOX]: SAVE_BUTTON_PARAMS,
        [TEXT]: SAVE_BUTTON_PARAMS,
        [CHECKBOX]: SAVE_BUTTON_PARAMS,
        [MENU_ITEM]: SELECT_BUTTON_PARAMS,
        [CARD_ITEM]: MENU_BUTTON_PARAMS,
    },
    "RIGHT": {
        [SELECT_BOX]: SELECT_BUTTON_PARAMS,
        [TEXT]: ERASE_BUTTON_PARAMS,
        [CHECKBOX]: EDIT_BUTTON_PARAMS,
        [MENU_ITEM]: BACK_BUTTON_PARAMS,
        [CARD_ITEM]: BACK_BUTTON_PARAMS,
    }
}