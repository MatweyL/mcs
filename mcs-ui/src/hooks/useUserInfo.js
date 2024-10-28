import {useSelector} from "react-redux";

export const useUserInfo = () => useSelector(state => state.user);

export const useToken = () => useSelector(state => state.user.token);

export const useAuthenticated = () => useSelector(state => state.user.authenticated);

export const useRole = () => useSelector(state => state.user.role);