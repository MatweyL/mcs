import {useEffect} from "react";
import {useDispatch} from "react-redux";
import {cacheService} from "../core/di";
import Actions from "../core/constants/actions";
import {action} from "./action";
import {CacheKeys} from "../core/store/cache_service";
import {request} from "./request";
import Requests from "../core/constants/requests";

export const useInitialization = () => {
    const dispatch = useDispatch();

    return useEffect(() => {
        const token = cacheService.get(CacheKeys.TOKEN_KEY);
        if (token) {
            action(Actions.AUTHENTICATE, {token}, dispatch);
        }

        const sessionId = cacheService.get(CacheKeys.SESSION_ID_KEY);
        if (sessionId) {
            request(Requests.OPEN_SCREEN_SESSION, {sessionId}, dispatch)
        }
    }, [])
}