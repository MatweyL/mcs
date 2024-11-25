import {useSelector} from "react-redux";

export const useRefreshTimetable = () => {
    return useSelector(state => state.event.refreshTimetable);
}