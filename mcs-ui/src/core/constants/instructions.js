export default class Instructions {
    // Скрыть атрибут и сбросить значение
    static HIDE = (attribute) => {
        attribute.visible = false;
        attribute.value = null;
    }

    // Показать атрибут
    static SHOW = (attribute) => {
        attribute.visible = true;
        attribute.value = attribute.value ? attribute.value : attribute.defaultValue;
    }
}