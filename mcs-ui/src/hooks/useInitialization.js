import {useEffect} from "react";
import {useDispatch} from "react-redux";
import {userService} from "../core/di";
import Actions from "../core/constants/actions";
import {action} from "./action";

export const useInitialization = () => {
    const dispatch = useDispatch();

    return useEffect(() => {
        const token = userService.getToken();
        if (token) {
            action(Actions.AUTHENTICATE, {token}, dispatch);
        }
    }, [])
}