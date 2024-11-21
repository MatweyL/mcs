import React from 'react';
import {SessionTypes} from "../../../core/constants/session_types";
import classes from "./SessionLabel.module.css";

const LABELS = {
    [SessionTypes.FREE]: {'name': 'Без оценки', 'color': '#caf8cb'},
    [SessionTypes.TRAINING]: {'name': 'Тренировка', 'color': '#f8efca'},
    [SessionTypes.EXAM]: {'name': 'На оценку', 'color': '#f8cfca'}
}

const SessionLabel = ({type}) => {
    return (
        <div style={{width: '70px'}}>
            <div className={classes.sessionLabel} style={{backgroundColor: LABELS[type].color}}>
                {LABELS[type].name}
            </div>
        </div>
    );
};

export default SessionLabel;