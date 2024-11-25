import React, {useEffect, useState} from 'react';
import {useSession} from "../../../hooks/useSession";
import {SessionTypes} from "../../../core/constants/session_types";
import classes from "./ExamTaskBox.module.css";
import {fetchDescription} from "../../../API/fetchers";

const ExamTaskBox = () => {
    const {type, sessionId, status} = useSession();
    const [taskDescription, setTaskDescription] = useState('');

    useEffect(() => {
        if (status === 'FINISHED') {
            return;
        }

        if (isExam()) {
            fetchDescription(sessionId).then(description => {
                console.log(description)
                setTaskDescription(description);
            })
        }
    }, [sessionId, status]);

    const isExam = () => type === SessionTypes.EXAM;

    return (
        isExam()
            ? <div className={classes.examTaskBox}>
                <div><b>Задание</b></div>
                <div>{taskDescription}</div>
            </div>
            : null
    );
};

export default ExamTaskBox;