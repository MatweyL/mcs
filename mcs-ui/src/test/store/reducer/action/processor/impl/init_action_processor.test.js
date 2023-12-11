import Actions from "../../../../../../store/constants/actions";
import {InitActionProcessor} from "../../../../../../store/reducer/action/processor/impl/init_action_processor";
import Attributes from "../../../../../../store/constants/attributes";

describe('InitActionProcessor', () => {
    const mockProcessMethod = jest.fn();
    const eventProcessor = {process: mockProcessMethod}

    const mockCreateMethod = jest.fn();
    const buttonsFactory = {create: mockCreateMethod}

    const processor = new InitActionProcessor(buttonsFactory, eventProcessor);

    test('должен производить заполнение состояния', () => {
        // GIVEN
        const mockButtons = {
            leftButton: {},
            rightButton: {},
        }
        mockCreateMethod.mockReturnValue(mockButtons);

        const state = {}
        const data = {
            label: 'Название экрана',
            name: "SCREEN_NAME",
            attributes: {
                'FIRST_NOT_VISIBLE': {
                    visible: false
                },
                'SECOND_VISIBLE': {

                },
                'THIRD_VISIBLE': {

                }
            }
        }

        // WHEN
        const actualState = processor.process(state, {payload: data});

        // THEN
        expect(actualState).not.toBe(state);
        expect(actualState.name).toBe('SCREEN_NAME');
        expect(actualState.label).toBe('Название экрана');
        expect(actualState.selectedAttribute).toBe('SECOND_VISIBLE');

        const actualAttributes = actualState.attributes;
        expect(actualAttributes.FIRST_NOT_VISIBLE.name).toBe('FIRST_NOT_VISIBLE');
        expect(actualAttributes.FIRST_NOT_VISIBLE.active).toBeFalsy();

        expect(actualAttributes.SECOND_VISIBLE.name).toBe('SECOND_VISIBLE');
        expect(actualAttributes.SECOND_VISIBLE.active).toBeTruthy();
        expect(actualAttributes.SECOND_VISIBLE.visible).toBeTruthy();

        expect(actualAttributes.THIRD_VISIBLE.name).toBe('THIRD_VISIBLE');
        expect(actualAttributes.THIRD_VISIBLE.active).toBe(false);
        expect(actualAttributes.SECOND_VISIBLE.visible).toBeTruthy();
    })

    test('Текстовое поле должно заполняться пустой строкой', () => {
        // GIVEN
        const mockButtons = {
            leftButton: {},
            rightButton: {},
        }
        mockCreateMethod.mockReturnValue(mockButtons);

        const state = {}
        const data = {
            label: 'Название экрана',
            name: "SCREEN_NAME",
            attributes: {
                'TEXT_ATTRIBUTE': {
                    type: Attributes.TEXT,
                    value: null
                }
            }
        }

        // WHEN
        const actualState = processor.process(state, {payload: data});

        // THEN
        expect(actualState).not.toBe(state);
        expect(actualState.name).toBe('SCREEN_NAME');
        expect(actualState.label).toBe('Название экрана');

        const actualAttributes = actualState.attributes;
        expect(actualAttributes.TEXT_ATTRIBUTE.value).toBe('');
    })

    test('должен возвращать верный тип действия', () => {
        expect(processor.getType()).toBe(Actions.INIT)
    })
})
