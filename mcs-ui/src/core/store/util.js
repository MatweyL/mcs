/// Конвертирует состояние в виде
/// {name: SCREEN_NAME, attributes: {ATTRIBUTE_NAME: value}}

export const convertState = (state) => {
    const attributesState = {};
    Object.keys(state.attributes)
        .forEach(name => attributesState[name] = state.attributes[name].value);

    return {
        name: state.name,
        attributes: attributesState
    };
}
