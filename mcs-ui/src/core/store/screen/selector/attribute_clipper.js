import AttributeHelper from "../../helper/attribute_helper";

/**
 * Обрезает атрибуты, к-е не вмещаются на экран
 */
export class AttributeClipper {
    clip(attributes, screenHeight) {
        const visibleAttributes = Object.values(attributes)
            .filter(attribute => AttributeHelper.isVisible(attribute));

        const activeIndex = visibleAttributes.findIndex(attribute => attribute.active);

        let accumulateHeight = 0;
        for (const attribute of visibleAttributes) {
            accumulateHeight += attribute.height;
            attribute.acc = accumulateHeight;
        }

        const activeAccHeight = visibleAttributes[activeIndex].acc;
        screenHeight = this.normalizeScreenHeight(screenHeight, activeAccHeight);

        const lowBound = Math.floor(activeAccHeight / screenHeight) * screenHeight;
        const highBound = lowBound + screenHeight;
        for (const attribute of visibleAttributes) {
            if (attribute.acc > lowBound) {
                AttributeHelper.unClipAttribute(attribute);
            } else if (attribute.acc <= lowBound){
                AttributeHelper.clipAttribute(attribute);
            }
        }
    }

    normalizeScreenHeight(screenHeight, activeAccHeight) {
        return activeAccHeight % screenHeight === 0 ? screenHeight + 1 : screenHeight;
    }
}