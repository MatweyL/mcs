export default class AttributeHelper {
    static isVisible(attribute) {
        return attribute.visible === true;
    }

    static isNotVisible(attribute) {
        return attribute.visible !== true;
    }
}