import AttributeHelper from "../../helper/attribute_helper";
import Instructions from "../../../constants/instructions";

/**
 * Обработчик событий при изменении атрибута
 */
export class EventProcessor {
    /**
     * Обработка событий атрибута
     *
     * @param attribute измененный атрибут
     * @param attributes все атрибуты
     */
    process(attribute, attributes) {
        for(const otherAttribute of Object.values(attributes)) {
            const events = AttributeHelper.getEvents(otherAttribute);
            const instructionCodes = events
                .filter(e => AttributeHelper.isEventTriggeredByAttribute(e, attribute))
                .flatMap(e => e.instructions);

            this.applyInstructions(otherAttribute, instructionCodes);
        }
    }

    applyInstructions(attribute, instructionCodes) {
        for (const instructionCode of instructionCodes) {
            Instructions[instructionCode](attribute);
        }
    }
}