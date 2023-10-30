import React, {useEffect, useState} from 'react';
import API from "../API/api";
import Selectbox from "./Selectbox";
import Checkbox from "./Checkbox";
import Text from "./Text";
import attribute from "./Attribute";

const Screen = () => {
    const [attributes, setAttributes] = useState({});
    const [buttons, setButtons] = useState({});

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

    const defaultProcess = (attribute) => {
        attribute.visible = true;
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

    const fillAttributes = (attributes) => {
        Object.keys(attributes).forEach(name => {
            attributes[name].name = name;
            processEvents(attributes[name], attributes);
            if (attributes[name].visible === undefined) {
                attributes[name].visible = true;
            }
        });
        setAttributes(attributes);
    }

    useEffect(() => {
        API.getScreen("CHANNEL_EDITOR")
            .then(rs => fillAttributes(rs.data.attributes))
    }, []);

    useEffect(() => {
        console.log("Текущее состояние формы:");
        console.log(attributes);
    }, [attributes])

    return (
        <div className="screen">
            {Object.keys(attributes)
                .map(name => convert(attributes[name], updateAttribute))
            }
            <div className="buttons">
                <div>Меню</div>
                <div>Назад</div>
            </div>
        </div>
    );
};

function convert(attribute, update) {
    return attribute.visible
        ? TYPE_TO_CREATE_ELEMENT[attribute.type](attribute, update)
        : null
}

function unfoldContainer(attribute) {
    if (attribute.type !== "CONTAINER") {
        return [attribute];
    }


    let childrenAttributes = attribute.childrenAttributes;
    return Object.values(childrenAttributes).flatMap(a => unfoldContainer(a));
}

let TYPE_TO_CREATE_ELEMENT = {
    "TEXT": createText,
    "BOOLEAN": createCheckbox,
    "DICTIONARY": createSelectbox,
}

let TYPE_TO_INSTRUCTION = {
    "SHOW": (a) => a.visible = true,
    "HIDE": hide,
}

function hide(attribute) {
    attribute.value = null;
    attribute.visible = false;
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