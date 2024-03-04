import {useSelector} from "react-redux";

export const useScreenSessionId = () => {
    return useSelector(state => state.session.sessionId);
}