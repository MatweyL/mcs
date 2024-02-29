import {useLocation} from "react-router-dom";
import {defaultRoutes, routes} from "../router";
import {useEffect} from "react";
import {useAuthenticated} from "./useAuthenticated";

export const useNavbarRoutes = (setNavbarRoutes) => {
    const location = useLocation();
    const authenticated = useAuthenticated();

    return useEffect(() => {
        if (authenticated) {
            setNavbarRoutes(routes);
        } else {
            setNavbarRoutes(defaultRoutes);
        }
    }, [authenticated, location.pathname])
}