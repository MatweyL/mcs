import React from 'react';
import classes from "./TimetableHead.module.css";


const TimetableHead = ({classWorks}) => {
    return (
        <thead>
        <tr className={classes.headRow}>
            <th rowSpan="2">
                Студенты
            </th>
            {classWorks.map((classWork, index) =>
                <th key={`${classWork.name}${index}`} className={classes.headCell}>{classWork.name}</th>
            )}
        </tr>
        <tr className={classes.headRow}>
            {classWorks.map((classWork, index) =>
                <th key={`${classWork.date}${index}`} className={classes.headDateCell}>{classWork.date}</th>
            )}
        </tr>
        </thead>
    );
};

export default TimetableHead;