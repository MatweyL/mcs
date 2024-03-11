import React, {useEffect} from 'react';
import {SessionTypes} from "../../../core/constants/session_types";
import classes from "./TrainingHintBox.module.css";
import {useHint} from "../../../hooks/useHint";
import {useDispatch} from "react-redux";
import {request} from "../../../hooks/request";
import Requests from "../../../core/constants/requests";
import {useSession} from "../../../hooks/useSession";
import {useScreenName} from "../../../hooks/useScreen";

const TrainingHintBox = () => {
    const {sessionType, sessionId} = useSession();

    const screenName = useScreenName();
    const dispatch = useDispatch();

    const hint = useHint();

    useEffect(() => {
        if (screenName) {
            request(Requests.REQUEST_HINT, {sessionId, screenName}, dispatch)
        }
    }, [screenName]);

    return (
        sessionType === SessionTypes.TRAINING
            ? null
            : <div className={classes.trainingHintBox}>
                <div>Шаг {hint.order}</div>
                <div>{hint.message}</div>
            </div>
    );
};

export default TrainingHintBox;