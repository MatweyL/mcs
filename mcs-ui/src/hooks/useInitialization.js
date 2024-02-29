import {useEffect} from "react";
import {useDispatch} from "react-redux";
import {userService} from "../core/di";
import {execute} from "../core/store/execute";
import Actions from "../core/constants/actions";

export const useInitialization = () => {
    const dispatch = useDispatch();

    return useEffect(() => {
        const token = userService.getToken();
        if (token) {
            execute(dispatch, {meta: {action: {type: Actions.AUTHENTICATE}}, payload: {token}})
        }
    }, [])
}