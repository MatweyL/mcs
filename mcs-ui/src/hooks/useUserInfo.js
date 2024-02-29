import {useSelector} from "react-redux";

export const useUserInfo = () => useSelector(state => state.user);