import React from 'react';
import classes from "./TimetableRow.module.css";
import Mark from "../Mark/Mark";

const TimetableRow = ({row, params}) => {
    return (
        <tr className={classes.timetableRow}>
            <td className={classes.nameCell}>{row.fio}</td>
            {row.results.map((result, index) =>
                <td key={index} className={classes.resultCell}>
                    <div className={classes.resultContainer}>
                        <Mark result={result}/>
                    </div>
                </td>
            )}
        </tr>
    );
};

export default TimetableRow;