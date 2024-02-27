/**
 * Конвертирует состояние в виде
 * <pre>
 * {name: SCREEN_NAME, attributes: {ATTRIBUTE_NAME: value}}
 * </pre>
 */
export const convertState = (state) => {
    const attributesState = {};
    Object.keys(state.attributes)
        .forEach(name => attributesState[name] = state.attributes[name].value);

    return {
        name: state.name,
        attributes: attributesState
    };
}
