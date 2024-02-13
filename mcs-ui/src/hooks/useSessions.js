import {useSelector} from "react-redux";

export const useSessions = () => {
    return useSelector(state => state.sessions);
}