import {NextCalculator} from "../../../../store/reducer/calculator/next_calculator";
import Actions from "../../../../store/constants/actions";

describe('NextCalculator', () => {
    const calculator = new NextCalculator();

    test.each`
    direction       | nowIndex          | length    | nextIndex
    ${Actions.UP}     ${0}                ${3}        ${2}
    ${Actions.UP}     ${1}                ${3}        ${0}
    ${Actions.UP}     ${2}                ${3}        ${1}
    ${Actions.DOWN}   ${0}                ${3}        ${1}
    ${Actions.DOWN}   ${1}                ${3}        ${2}
    ${Actions.DOWN}   ${2}                ${3}        ${0}
    `('должен расчитывать в зависимости от направления', ({direction, nowIndex, length, nextIndex}) => {
        expect(calculator.calculateNextByDirection(direction, nowIndex, length)).toBe(nextIndex);
    })
})