import React, {useEffect, useReducer, useState} from 'react';
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

const ManagedScreen = () => {
    const [attributes, setAttributes] = useState({});
    const [selectedAttribute, setSelectedAttribute] = useState({});
    const [leftButton, setLeftButton] = useState({})
    const [rightButton, setRightButton] = useState({})

    const [state, dispatch] = useReducer((state, action) => {

    }, {}, () => {

    })

    const updateAttribute = (attribute) => {
        console.log("Call update attribute on screen", attribute.name)
        console.log(attribute)
        if (attribute.active === true) {
            setSelectedAttribute(attribute);
        }
        let copiedAttributes = {...attributes, [attribute.name]: attribute};
        setAttributes(copiedAttributes)
    }

    useEffect(() => {

        selectAttribute(Object.values(defaultAttributes)[0]);
        fillAttributes(defaultAttributes);
        setLeftButton({"name": "SELECT", "label": "Выбрать", "type": "LEFT"})
        setRightButton({"name": "ERASE", "label": "Стереть", "type": "RIGHT"})
    }, []);

    const fillAttributes = (attributes) => {
        Object.values(attributes).forEach(attribute => {
            if (attribute.type === 'TEXT') {
                attribute.erase = () => {
                    attribute.value = attribute.value.slice(0, -1);
                }
            }
            if (attribute.type === 'BOOLEAN') {
                attribute.toggle = () => {
                    attribute.value = !attribute.value
                };
            }
        })

        setAttributes(attributes);
    }

    const selectAttribute = (attribute) => {
        if (selectedAttribute.type !== undefined) {
            selectedAttribute.active = false;
        }
        attribute.active = true;
        setSelectedAttribute(attribute);
    }

    const up = () => {
        next("up",
            (index, names) => index === 0 ? names.length - 1 : (index - 1) % names.length);
    }

    const next = (direction, calculateNext) => {
        let name = selectedAttribute.name
        let names = Object.keys(attributes);
        let index = names.indexOf(name);
        let nextIndex = calculateNext(index, names);
        let nextAttribute = Object.values(attributes).at(nextIndex);
        while (!nextAttribute.visible) {
            nextIndex = calculateNext(nextIndex, names);
            nextAttribute = Object.values(attributes).at(nextIndex);
        }
        selectAttribute(nextAttribute);
        console.log(`Next - ${nextAttribute.name}`)
        console.log(direction);
    }

    const down = () => {
        next('down', (index, names) => (index + 1) % names.length)
    }

    const left = () => {
        console.log("left");
    }

    const right = () => {
        console.log("right");
        execute(rightButton.name, selectedAttribute);
    }

    const execute = (name, attribute) => {
        console.log(name);
        if (name === "ERASE") {
            updateAttribute({...attribute, value: attribute.value.slice(0, -1)});
        }

        if (name === "EDIT") {
            updateAttribute({...attribute, value: !attribute.value});
        }
    }

    return (
        <div>
            <div className="screen">
                <div className="screen-label">
                    {"Редактор канала"}
                </div>
                {Object.keys(attributes)
                    .map(name => convert(attributes[name], updateAttribute))
                }
                <div className="buttons">
                    <Button button={leftButton}
                            setButton={setLeftButton}
                            selectedAttribute={selectedAttribute}/>
                    <Button button={rightButton}
                            setButton={setRightButton}
                            selectedAttribute={selectedAttribute}/>
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

function convert(attribute, update) {
    console.log(attribute.name);
    return attribute.visible
        ? TYPE_TO_CREATE_ELEMENT[attribute.type](attribute, update)
        : null
}

function createSelectbox(attribute, update) {
    return (
        <Selectbox attribute={attribute} update={update} key={attribute.name}/>
    );
}

function createText(attribute, update) {
    return (
        <Text attribute={attribute} update={update} key={attribute.name}/>
    );
}

function createCheckbox(attribute, update) {
    return (
        <Checkbox attribute={attribute} update={update} key={attribute.name}/>
    );
}

export default ManagedScreen;