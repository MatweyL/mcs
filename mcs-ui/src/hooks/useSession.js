import {useSelector} from "react-redux";

export const useSessionType = () => {
    return useSelector(state => state.session.type);
}

export const useScreenSessionId = () => {
    return useSelector(state => state.session.sessionId);
}

export const useSession = () => {
    return useSelector(state => state.session);
}

export const useTrainingResult = () => {
    return useSelector(state => state.session.trainingResult);
}