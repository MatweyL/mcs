import {useEffect} from "react";
import {useDispatch} from "react-redux";
import {cacheService} from "../core/di";
import Actions from "../core/constants/actions";
import {action} from "./action";
import {CacheKeys} from "../core/store/cache_service";

export const useInitialization = () => {
    const dispatch = useDispatch();

    return useEffect(() => {
        const token = cacheService.get(CacheKeys.TOKEN_KEY);
        if (token) {
            action(Actions.AUTHENTICATE, {token}, dispatch);
        }
    }, [])
}