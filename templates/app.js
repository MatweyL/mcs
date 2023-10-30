// import { jsonLogic } from './logic.js';

const URL = "https://056f0a88-8d8e-4a2b-b6a5-8f196f1bee39.mock.pstmn.io/screen";
const EDITOR_SCREEN = "EDITOR_SCREEN"

document.addEventListener("DOMContentLoaded", function() {
  getScreen(EDITOR_SCREEN);
});

function getScreen(screenName) {
    fetch(`${URL}/${screenName}`)
        .then((response) => response.json())
        .then((json) => applyToDocument(json))
        .then()
}

function applyToDocument(template) {
    Object.values(template.attributes)
        .forEach((attribute) => appendToDocument(attribute));
}

function appendToDocument(attribute) {
    let screen = document.getElementById("screen");

    let element = convert(attribute);
    screen.append(element);
}

let TYPE_TO_CREATE_ELEMENT = {
    "TEXT": createText,
    "BOOLEAN": createCheckbox,
    "DICTIONARY": createSelectbox
}

function createSelectbox(attribute) {
    return document.createElement("select");
}

function createText(attribute) {
    let text = document.createElement("p")
    return text;
}

function createCheckbox(attribute) {
    let checkbox = document.createElement("input");
    checkbox.setAttribute("type", "checkbox");

    return checkbox;
}

function convert(attribute) {
    console.log(attribute.type);
    let element = TYPE_TO_CREATE_ELEMENT[attribute.type](attribute)
    return element;
}

function apply() {
    return jsonLogic.apply();
}

