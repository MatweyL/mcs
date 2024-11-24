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
    const {type, sessionId, status} = useSession();

    const screenName = useScreenName();
    const dispatch = useDispatch();

    const hint = useHint();

    useEffect(() => {
        if (status === 'FINISHED') {
            return;
        }

        if (screenName && isTraining()) {
            request(Requests.REQUEST_HINT, {sessionId, screenName}, dispatch)
        }
    }, [screenName, status]);

    const isTraining = () => type === SessionTypes.TRAINING;

    return (
        isTraining()
            ? <div className={classes.trainingHintBox}>
                <div>Шаг {hint.order}</div>
                <div>{hint.message}</div>
            </div>
            : null
    );
};

export default TrainingHintBox;