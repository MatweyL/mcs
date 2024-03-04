import {useSelector} from "react-redux";

export const useTrainingResult = () => {
    return useSelector(state => state.session.trainingResult);
}