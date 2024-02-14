import {useSelector} from "react-redux";

export const useScreen = () => {
    return useSelector(state => state.screen);
}