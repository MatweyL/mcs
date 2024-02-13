import {configureStore} from "@reduxjs/toolkit";
import {reducer_v2} from "./reducer_v2";



const screenReducer = (state = {}, action) => {
    return state;
}

const defaultSessionState = [
    {name: "Сеанс - УТК-1", date: "12/11/2023 14:15"},
    {name: "Сеанс - УТК-2", date: "12/11/2023 14:15"},
    {name: "Сеанс - УТК-2", date: "12/11/2023 14:15"},
    {name: "Сеанс - УТК-3", date: "12/11/2023 14:15"},
    {name: "Сеанс - УТК-4", date: "12/11/2023 14:15"},
    {name: "Сеанс - УТК-4", date: "12/11/2023 14:15"},
]

const sessionReducer = (state = defaultSessionState, action) => {
    return state;
}


export const store = configureStore({
    reducer: {
        screen: reducer_v2,
        sessions: sessionReducer
    },
})