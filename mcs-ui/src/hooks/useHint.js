import {useSelector} from "react-redux";

export const useHint = () => {
    return useSelector(state => state.hint);
}