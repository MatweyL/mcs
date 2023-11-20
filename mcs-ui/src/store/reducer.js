import {navigator} from "./navigator";
import {
    BACK,
    CARD_ITEM,
    CHECKBOX,
    CLOSE_MENU,
    CLOSE_SELECT_BOX,
    CREATE,
    DELETE,
    DOWN,
    EDIT,
    ERASE,
    INIT,
    MENU_ITEM,
    MULTISELECT,
    OPEN,
    OPEN_MENU,
    OPEN_SELECT_BOX,
    SAVE,
    SAVE_SELECTED,
    SELECT,
    SELECT_BOX,
    TEXT,
    UP,
    UPDATE_ATTRIBUTE
} from "./constants";
import {calculateNextByDirection, convertState} from "./util";

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
            state.selectedAttribute = Object.keys(state.attributes)
                .find(name => isVisible(state.attributes[name]));
            state.attributes[state.selectedAttribute].active = true;
            state.label = data.label;
            state.name = data.name;
            updateButtons(state.attributes[state.selectedAttribute].type, state);
            navigator.push(data.name);
            return {...state}
        }

        case OPEN_SELECT_BOX: {
            const attribute = action.payload;
            attribute.open = true;
            attribute.dictionaryValues[0].active = true;
            state.attributes = {...state.attributes, [attribute.name]: attribute};

            state.buttons.rightButton = CLOSE_SELECT_BOX_BUTTON;
            state.buttons.leftButton = SAVE_SELECTED_BUTTON;

            return {...state};
        }

        case CLOSE_SELECT_BOX: {
            const attribute = action.payload;
            attribute.open = false;
            Object.values(attribute.dictionaryValues)
                .forEach(value => value.active = false);

            state.attributes = {...state.attributes, [attribute.name]: attribute};

            state.buttons.rightButton = OPEN_SELECT_BOX_BUTTON;
            state.buttons.leftButton = SAVE_BUTTON;

            return {...state};
        }

        case SAVE_SELECTED: {
            const attribute = action.payload;
            console.log(attribute);
            const activeValue = attribute.dictionaryValues.find(dictValue => dictValue.active);
            console.log(activeValue);
            attribute.value = activeValue.value;
            attribute.open = false;
            Object.values(attribute.dictionaryValues)
                .forEach(value => value.active = false);
            processEvents(attribute, state.attributes);
            state.attributes = {...state.attributes, [attribute.name]: attribute};

            state.buttons.rightButton = OPEN_SELECT_BOX_BUTTON;
            state.buttons.leftButton = SAVE_BUTTON;

            return {...state};
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

        case OPEN_MENU: {
            state.buttons.leftButton = MULTISELECT_BUTTON;
            state.buttons.leftButton.open = true;
            state.buttons.leftButton.items = items;
            state.buttons.rightButton = CLOSE_MENU_BUTTON;
            return {...state}
        }

        case CLOSE_MENU: {
            state.buttons.leftButton = OPEN_MENU_BUTTON;
            state.buttons.leftButton.open = false;
            state.buttons.rightButton = RETURN_BACK_BUTTON;
            return {...state}
        }

        case UP: {
            selectNext(state, action.payload, UP);
            return {...state};
        }

        case DOWN: {
            selectNext(state, action.payload, DOWN)
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
    console.log("ТЕКУЩЕЕ СОСТОЯНИЕ ФОРМЫ:", convertState(state));
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
        if (attributes[name].visible === undefined) {
            show(attributes[name]);
        }
        processEvents(attributes[name], attributes);
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


const selectNext = (state, name, direction) => {
    let nowAttribute = state.attributes[name];
    if (nowAttribute.type === SELECT_BOX && nowAttribute.open) {
        selectNextSelectBoxOption(state, nowAttribute, direction);
    } else if (state.buttons.leftButton.open) {
        selectNextMultiButtonOption(state, 'leftButton', direction);
    } else if (state.buttons.rightButton.open) {
        selectNextMultiButtonOption(state, 'rightButton', direction);
    } else {
        selectNextAttribute(state, name, direction);
    }
}

const selectNextSelectBoxOption = (state, selectBox, direction) => {
    let values = selectBox.dictionaryValues;
    const activeOptionIndex = values.findIndex(dictValue => dictValue.active);
    values[activeOptionIndex].active = false;
    let nextIndex = calculateNextByDirection(direction, activeOptionIndex, values.length);
    console.log("Next index:", nextIndex, " index:", activeOptionIndex);
    values[nextIndex].active = true;
}

const selectNextMultiButtonOption = (state, buttonName, direction) => {
    const button = state.buttons[buttonName];
    const activeItemIndex = button.items.findIndex(item => item.active);
    button.items[activeItemIndex].active = false;
    let nextIndex = calculateNextByDirection(direction, activeItemIndex, button.items.length);
    console.log("Next index:", nextIndex, " index:", activeItemIndex);
    button.items[nextIndex].active = true;
}

const selectNextAttribute = (state, name, direction) => {
    let names = Object.keys(state.attributes);
    let index = names.indexOf(name);

    let nextIndex = calculateNextByDirection(direction, index, names.length);
    console.log("Next index:", nextIndex, " index:", index);
    let nextAttribute = Object.values(state.attributes).at(nextIndex);
    while (!isVisible(nextAttribute)) {
        nextIndex = calculateNextByDirection(direction, nextIndex, names.length);
        nextAttribute = Object.values(state.attributes).at(nextIndex);
    }
    selectAttribute(state, nextAttribute.name);
    console.log(`Next - ${nextAttribute.name}`)
}

const isVisible = (attribute) => {
    return attribute.visible === true;
}

const show = (attribute) => {
    attribute.visible = true;
    if (attribute.type === SELECT_BOX) {
        attribute.value = attribute.defaultValue;
    }
}

const hide = (attribute) => {
    attribute.value = null;
    attribute.visible = false;
}


const TYPE_TO_INSTRUCTION = {
    "SHOW": show,
    "HIDE": hide,
}
const selectAttribute = (state, name) => {
    const prevName = state.selectedAttribute;
    state.attributes[prevName].active = false;
    state.attributes[name].active = true;
    updateButtons(state.attributes[name].type, state);
    state.selectedAttribute = name;
}

const updateButtons = (selectedAttributeType, state) => {
    console.log("UPDATE BUTTONS", selectedAttributeType);
    state.buttons = {
        leftButton: BUTTONS_PARAMS["LEFT"][selectedAttributeType],
        rightButton: BUTTONS_PARAMS["RIGHT"][selectedAttributeType]
    }
}

const items = [
    {label: "Редактировать", active: true, action: OPEN},
    {label: "Добавить", active: false, action: CREATE},
    {label: "Удалить", active: false, action: DELETE},
]


const SAVE_BUTTON = {action: SAVE, label: "Сохранить"}
const SELECT_BUTTON_PARAMS = {action: SELECT, label: "Выбрать"}

const ERASE_BUTTON_PARAMS = {action: ERASE, label: "Стереть"}
const EDIT_BUTTON_PARAMS = {action: EDIT, label: "Изменить"}

const CLOSE_MENU_BUTTON = {action: CLOSE_MENU, label: "Назад"}
const RETURN_BACK_BUTTON = {action: BACK, label: "Назад"}
const CLOSE_SELECT_BOX_BUTTON = {action: CLOSE_SELECT_BOX, label: "Назад"}

const OPEN_MENU_BUTTON = {action: OPEN_MENU, label: "Меню"}
const OPEN_SELECT_BOX_BUTTON = {action: OPEN_SELECT_BOX, label: "Выбрать"}

const MULTISELECT_BUTTON = {action: MULTISELECT, label: "Выбрать"}
const SAVE_SELECTED_BUTTON = {action: SAVE_SELECTED, label: "Выбрать"}

const BUTTONS_PARAMS = {
    "LEFT": {
        [SELECT_BOX]: SAVE_BUTTON,
        [TEXT]: SAVE_BUTTON,
        [CHECKBOX]: SAVE_BUTTON,
        [MENU_ITEM]: SELECT_BUTTON_PARAMS,
        [CARD_ITEM]: OPEN_MENU_BUTTON,
    },
    "RIGHT": {
        [SELECT_BOX]: OPEN_SELECT_BOX_BUTTON,
        [TEXT]: ERASE_BUTTON_PARAMS,
        [CHECKBOX]: EDIT_BUTTON_PARAMS,
        [MENU_ITEM]: RETURN_BACK_BUTTON,
        [CARD_ITEM]: RETURN_BACK_BUTTON,
    }
}