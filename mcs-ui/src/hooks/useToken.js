import {useSelector} from "react-redux";

export const useToken = () => useSelector(state => state.user.token);