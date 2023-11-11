import React, {useCallback, useReducer} from 'react';
import Button from "./Button";
import Text from "./Text";
import Checkbox from "./Checkbox";
import Selectbox from "./Selectbox";

const defaultAttributes = {
    CHECK_1: {
        name: "CHECK_1",
        label: "Чекбокс 1",
        value: true,
        visible: true,
        type: "BOOLEAN"
    },
    CHECK_2: {
        name: "CHECK_2",
        label: "Чекбокс 2",
        value: true,
        visible: true,
        type: "BOOLEAN"
    },
    CHECK_3: {
        name: "CHECK_3",
        label: "Чекбокс 3",
        value: true,
        visible: false,
        type: "BOOLEAN"
    },
    SELECT_BOX: {
        name: "SELECT_BOX",
        label: "Выпадающее меню",
        dictionaryType: "MODE",
        type: "DICTIONARY",
        visible: true,
        value: "CHM25"
    },
    TEXT_1: {
        name: "TEXT_1",
        label: "Текст 1",
        value: "",
        visible: true,
        type: "TEXT"

    },
    TEXT_2: {
        name: "TEXT_2",
        label: "Текст 2",
        value: "",
        visible: true,
        type: "TEXT"
    }
}

const defaultState = {
    attributes: defaultAttributes,
    selectedAttribute: null,
    buttons: {
        leftButton: {
            "name": "SELECT", "label": "Выбрать", "type": "LEFT"
        },
        rightButton: {
            "name": "ERASE", "label": "Стереть", "type": "RIGHT"
        }
    }
}


const reducer = (state, action) => {
    switch (action.type) {
        case "SELECT_ATTRIBUTE": {
            const name = action.payload;
            selectAttribute(state, name);
            return {...state}
        }

        case "UPDATE_ATTRIBUTE": {
            const attribute = action.payload;
            state.attributes[attribute.name] = attribute;
            return {...state};
        }

        case "UP": {
            selectNext(state,
                action.payload,
                "up",
                (index, names) => index === 0 ? names.length - 1 : (index - 1) % names.length)
            return {...state};
        }

        case "DOWN": {
            selectNext(state,
                action.payload,
                "down",
                (index, names) => (index + 1) % names.length)
            return {...state};
        }

        case "EDIT": {
            console.log(action.payload);
            const attribute = state.attributes[state.selectedAttribute];
            attribute.value = !attribute.value;
            return {...state, attributes: {...state.attributes, [attribute.name]: attribute}};
        }

        case "ERASE": {
            const attribute = state.attributes[state.selectedAttribute];
            attribute.value = attribute.value.slice(0, -1);
            return {...state, attributes: {...state.attributes, [attribute.name]: attribute}};
        }
        default:
            return state;
    }
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


const ReducerManagedScreen = () => {
    const initializer = () => {
        // fetch template

        Object.keys(defaultState.attributes).slice(1)
            .forEach(name => defaultState.attributes[name].active = false);

        defaultState.selectedAttribute = Object.keys(defaultState.attributes)[0];
        defaultState.attributes[defaultState.selectedAttribute].active = true;
        console.log(defaultState);
        return defaultState;
    }

    const [state, dispatch] = useReducer(reducer, {}, initializer)

    const left = () => {
        console.log("left");
        dispatch({type: state.buttons.leftButton.name});
    }

    const right = () => {
        console.log("right");
        dispatch({type: state.buttons.rightButton.name,
            payload: state.attributes[state.selectedAttribute]});
    }

    const up = () => {
        console.log("Call up!");
        dispatch({type: "UP", payload: state.selectedAttribute});
    }

    const down = () => {
        dispatch({type: "DOWN", payload: state.selectedAttribute});
    }

    return (
        <div>
            <div className="screen">
                <div className="screen-label">
                    {"Редактор канала"}
                </div>
                {Object.keys(state.attributes)
                    .map(name => convert(state.attributes[name], dispatch))
                }
                <div className="buttons">
                    <Button button={state.buttons.leftButton} dispatch={dispatch}/>
                    <Button button={state.buttons.rightButton} dispatch={dispatch}/>
                </div>
            </div>
            <div className="keyboard">
                <div className="keys-row">
                    <div className="key" onClick={left}>^</div>
                    <div className="key" onClick={up}>/\</div>
                    <div className="key" onClick={right}>^</div>
                </div>
                <div className="keys-row">
                    <div className="key">Связь</div>
                    <div className="key" onClick={down}>\/</div>
                    <div className="key">Конец</div>
                </div>
                <div className="keys-row">
                    <div className="key">1</div>
                    <div className="key">2</div>
                    <div className="key">3</div>
                </div>
                <div className="keys-row">
                    <div className="key">4</div>
                    <div className="key">5</div>
                    <div className="key">6</div>
                </div>
                <div className="keys-row">
                    <div className="key">7</div>
                    <div className="key">8</div>
                    <div className="key">9</div>
                </div>
                <div className="keys-row">
                    <div className="key">*</div>
                    <div className="key">0</div>
                    <div className="key">#</div>
                </div>
            </div>
        </div>
    );
};


const TYPE_TO_CREATE_ELEMENT = {
    "TEXT": createText,
    "BOOLEAN": createCheckbox,
    "DICTIONARY": createSelectbox,
}

function convert(attribute, dispatch) {
    return attribute.visible
        ? TYPE_TO_CREATE_ELEMENT[attribute.type](attribute, dispatch)
        : null
}

function createSelectbox(attribute, dispatch) {
    return (
        <Selectbox attribute={attribute} dispatch={dispatch} key={attribute.name}/>
    );
}

function createText(attribute, dispatch) {
    return (
        <Text attribute={attribute} dispatch={dispatch} key={attribute.name}/>
    );
}

function createCheckbox(attribute, dispatch) {
    return (
        <Checkbox attribute={attribute} dispatch={dispatch} key={attribute.name}/>
    );
}

const SAVE_BUTTON_PARAMS = {name: "SAVE", label: "Сохранить"}
const SELECT_BUTTON_PARAMS = {name: "SELECT", label: "Выбрать"}
const ERASE_BUTTON_PARAMS = {name: "ERASE", label: "Стереть"}
const EDIT_BUTTON_PARAMS = {name: "EDIT", label: "Изменить"}

const SELECT_BOX = "DICTIONARY"
const TEXT = "TEXT"
const CHECKBOX = "BOOLEAN"

const BUTTONS_PARAMS = {
    "LEFT": {
        [SELECT_BOX]: SAVE_BUTTON_PARAMS,
        [TEXT]: SAVE_BUTTON_PARAMS,
        [CHECKBOX]: SAVE_BUTTON_PARAMS
    },
    "RIGHT": {
        [SELECT_BOX]: SELECT_BUTTON_PARAMS,
        [TEXT]: ERASE_BUTTON_PARAMS,
        [CHECKBOX]: EDIT_BUTTON_PARAMS
    }
}

export default ReducerManagedScreen;