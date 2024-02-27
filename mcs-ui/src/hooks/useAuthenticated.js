import {useSelector} from "react-redux";

export const useAuthenticated = () => useSelector(state => state.user.authenticated);