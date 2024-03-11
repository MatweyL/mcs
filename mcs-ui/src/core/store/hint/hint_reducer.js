import Actions from "../../constants/actions";

const defaultState = {};

export const hintReducer = (state = defaultState, action) => {
    switch (action.type) {
        case Actions.UPDATE_HINT: {
            const {order, message} = action.payload;
            return {order, message};
        }

        default:
            return state;
    }
}