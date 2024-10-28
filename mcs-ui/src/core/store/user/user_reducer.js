import Actions from "../../constants/actions";
import {AuthStatus} from "../../constants/auth_statuses";

const defaultState = {
    authenticated: false,
    role: "",
    token: "",
    fio: ""
}

export const userReducer = (state = defaultState, action) => {
    console.log(`User Reducer process - ${action.type}`);
    switch (action.type) {
        case Actions.LOAD_USER_INFO: {
            console.log(action.payload);
            const {status, token, fio, role} = action.payload;
            if (status === AuthStatus.NON_AUTHENTICATED) {
                return {authenticated: false, token: null};
            }
            return {authenticated: true, token, fio, role};
        }

        case Actions.AUTHENTICATE: {
            const {token} = action.payload;
            return {authenticated: true, token};
        }

        case Actions.LOGOUT: {
            return {authenticated: false};
        }
    }

    return state;
}