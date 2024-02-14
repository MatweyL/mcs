import {useLocation} from "react-router-dom";
import {routes} from "../router";
import {useEffect} from "react";

export const useNavbarRoutes = (setNavbarRoutes) => {
    const location = useLocation();
    return useEffect(() => {
        setNavbarRoutes(routes);
    }, [location.pathname])
}