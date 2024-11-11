import React from 'react';
import classes from "./Mark.module.css";
import {MarkColors} from "../../../core/constants/mark_colors";

const Mark = ({result}) => {

    const mark = {value: result.mark, status: 1}

    return (
        <div className={classes.mark} style={{backgroundColor: MarkColors.of(mark.value)}}>
            {mark.value}
        </div>
    );
};

export default Mark;