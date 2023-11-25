/// Конвертирует состояние в виде
/// {name: SCREEN_NAME, attributes: {ATTRIBUTE_NAME: value}}

import Actions from "./constants/actions";

export const convertState = (state) => {
    const attributesState = {};
    Object.keys(state.attributes)
        .forEach(name => attributesState[name] = state.attributes[name].value);

    return {
        name: state.name,
        attributes: attributesState
    };
}

export const calculateNextByDirection = (direction, nowIndex, length) => {
    return CALCULATORS[direction](nowIndex, length);
}

const calculateNextDown = (nowIndex, length) => {
    return (nowIndex + 1) % length;
}

const calculateNextUp = (nowIndex, length) => {
    return nowIndex === 0
        ? length - 1
        : (nowIndex - 1) % length;
}

const CALCULATORS = {
    [Actions.UP]: calculateNextUp,
    [Actions.DOWN]: calculateNextDown
}
