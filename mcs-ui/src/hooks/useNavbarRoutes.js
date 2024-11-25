import {useLocation} from "react-router-dom";
import {defaultRoutes, studentRoutes, teacherRoutes} from "../router";
import {useEffect} from "react";
import {useAuthenticated, useRole} from "./useUserInfo";
import Roles from "../core/constants/roles";

export const useNavbarRoutes = (setNavbarRoutes) => {
    const location = useLocation();
    const authenticated = useAuthenticated();
    const role = useRole();

    return useEffect(() => {
        if (authenticated) {
            let targetRoutes = role === Roles.TEACHER
                ? teacherRoutes
                : studentRoutes;
            setNavbarRoutes(targetRoutes);
        } else {
            setNavbarRoutes(defaultRoutes);
        }
    }, [authenticated, role, location.pathname])
}