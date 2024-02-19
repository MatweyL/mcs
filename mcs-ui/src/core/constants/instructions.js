import Attributes from "./attributes";

export default class Instructions {
    // Скрыть атрибут
    static HIDE = (attribute) => {
        attribute.visible = false;
        attribute.value = null;
    }

    // Показать атрибут
    static SHOW = (attribute) => {
        attribute.visible = true;
        if (attribute.type === Attributes.SELECT_BOX) {
            attribute.value = attribute.value ? attribute.value : attribute.defaultValue;
        }
    }
}