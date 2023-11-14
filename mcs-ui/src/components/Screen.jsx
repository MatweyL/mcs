import React, {useEffect, useState} from 'react';
import API from "../API/api";
import Selectbox from "./Selectbox";
import Checkbox from "./Checkbox";
import Text from "./Text";
import Button from "./Button";

const Screen = () => {
    const [attributes, setAttributes] = useState({});
    const [screenLabel, setScreenLabel] = useState("")
    const [buttons, setButtons] = useState({});
    const [selectedAttributeIndex, setSelectedAttributeIndex] = useState(-1)

    const updateAttribute = (attribute) => {
        console.log("Call update attribute on screen", attribute.name)
        console.log(attribute)
        processEvents(attribute, attributes)
        let copiedAttributes = {...attributes, [attribute.name]: attribute};
        setAttributes(copiedAttributes)
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

    useEffect(() => {
        API.getScreen("CHANNEL_EDITOR")
            .then(rs => updateScreen(rs.data))
    }, []);

    const updateScreen = (data) => {
        fillAttributes(data.attributes);
        setScreenLabel(data.label);
        fillButtons(data.buttons);
    }

    const fillButtons = (buttons) => {
        Object.keys(buttons).forEach(name => {
                buttons[name].name = name;
            }
        )
        setButtons(buttons);
    }

    const fillAttributes = (attributes) => {
        Object.keys(attributes).forEach(name => {
            attributes[name].name = name;
            attributes[name].selected = false;
            processEvents(attributes[name], attributes);
            if (attributes[name].visible === undefined) {
                attributes[name].visible = true;
            }
        });
        setAttributes(attributes);
    }

    useEffect(() => {
        console.log("Текущее состояние формы:");
        console.log(attributes);
    }, [attributes])

    const selectNext = () => {
        let names = Object.keys(attributes);
        let nextIndex =  (selectedAttributeIndex + 1) % names.length
        let name = names.at(nextIndex);
        document.getElementById(name).setAttribute("class", "attribute-active");
        document.getElementById(name).setAttribute("class", "attribute-active");
        setSelectedAttributeIndex(nextIndex);
    }

    return (
        <div>
            <div className="screen">
                <div className="screen-label">
                    {screenLabel}
                </div>
                {Object.keys(attributes)
                    .map(name => convert(attributes[name], updateAttribute))
                }
                <div className="buttons">
                    {Object.keys(buttons)
                        .map(name => <Button button={buttons[name]}/> )
                    }
                </div>
            </div>

                <div className="keyboard">
                <div className="keys-row">
                    <div className="key">^</div>
                    <div className="key" onClick={selectNext}>/\</div>
                    <div className="key">^</div>
                </div>
                <div className="keys-row">
                    <div className="key">Связь</div>
                    <div className="key">\/</div>
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

let TYPE_TO_INSTRUCTION = {
    "SHOW": (a) => a.visible = true,
    "HIDE": hide,
}
function hide(attribute) {
    attribute.value = null;
    attribute.visible = false;
}

function convert(attribute, update) {
    return attribute.visible
        ? TYPE_TO_CREATE_ELEMENT[attribute.type](attribute, update)
        : null
}

let TYPE_TO_CREATE_ELEMENT = {
    "TEXT": createText,
    "BOOLEAN": createCheckbox,
    "DICTIONARY": createSelectbox,
}



function createSelectbox(attribute, update) {
    return (
        <Selectbox attribute={attribute} update={update}/>
    );
}

function createText(attribute, update) {
    return (
        <Text attribute={attribute} update={update}/>
    );
}

function createCheckbox(attribute, update) {
    return (
        <Checkbox attribute={attribute} update={update}/>
    );
}

export default Screen;