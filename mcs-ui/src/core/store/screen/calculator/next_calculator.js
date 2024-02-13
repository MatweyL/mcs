import Actions from "../../../constants/actions";

export class NextCalculator {
    calculateNextByDirection(direction, nowIndex, length) {
        let nextIndex = CALCULATORS[direction](nowIndex, length);
        console.log("Next index:", nextIndex, " index:", nowIndex);
        return nextIndex;
    }
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

