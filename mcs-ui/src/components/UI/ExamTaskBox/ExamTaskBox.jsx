import React, {useEffect} from 'react';
import {useSession} from "../../../hooks/useSession";
import {useScreenName} from "../../../hooks/useScreen";
import {useDispatch} from "react-redux";
import {request} from "../../../hooks/request";
import Requests from "../../../core/constants/requests";
import {SessionTypes} from "../../../core/constants/session_types";
import classes from "./ExamTaskBox.module.css";

const ExamTaskBox = () => {
    const {type, sessionId, status} = useSession();

    const screenName = useScreenName();
    const dispatch = useDispatch();

    useEffect(() => {
        if (status === 'FINISHED') {
            return;
        }

        if (screenName && isExam()) {
            request(Requests.REQUEST_TASK, {sessionId}, dispatch)
        }
    }, [screenName, status]);

    const isExam = () => type === SessionTypes.EXAM;

    return (
        isExam()
            ? <div className={classes.examTaskBox}>
                <div>Выполните задание!</div>
            </div>
            : null
    );
};

export default ExamTaskBox;