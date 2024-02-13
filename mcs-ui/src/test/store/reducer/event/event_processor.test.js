import {EventProcessor} from "../../../../core/store/screen/event/event_processor";
import Attributes from "../../../../core/constants/attributes";

describe('EventProcessor', () => {
    const eventProcessor = new EventProcessor();

    test('должен применять инструкции к тем атрибутам, которые вызываются событиями',
        () => {
            // GIVEN
            const attribute = {
                name: '1',
                value: true
            }

            const attributes = {
                '2': {
                    events: [
                        {
                            attribute: '1',
                            instructions: [
                                "SHOW"
                            ],
                            firingValues: [true]
                        }
                    ],
                    visible: false
                },
                '3': {
                    value: '1234',
                    events: [
                        {
                            attribute: '1',
                            instructions: [
                                "HIDE"
                            ],
                            firingValues: [true]
                        }
                    ],
                    visible: true
                },
                '4': {
                    value: null,
                    type: Attributes.SELECT_BOX,
                    defaultValue: "NOT_DEFINED",
                    events: [
                        {
                            attribute: '1',
                            instructions: [
                                "SHOW"
                            ],
                            firingValues: [true]
                        }
                    ],
                    visible: false
                },
                '5': {
                    value: true,
                    visible: true
                }
            }

            // WHEN
            eventProcessor.process(attribute, attributes);

            // THEN
            expect(attributes['2'].visible).toBeTruthy();
            expect(attributes['3'].visible).toBeFalsy();
            expect(attributes['3'].value).toBeNull();
            expect(attributes['4'].visible).toBeTruthy();
            expect(attributes['4'].value).toBe("NOT_DEFINED");
            expect(attributes['5'].value).toBeTruthy();
            expect(attributes['5'].visible).toBeTruthy();
        })
})