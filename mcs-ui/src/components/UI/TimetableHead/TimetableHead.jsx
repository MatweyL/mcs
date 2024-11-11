import React from 'react';
import FieldSelectbox from "../FieldSelectbox/FieldSelectbox";
import classes from "./TimetableHead.module.css";


const TimetableHead = ({groups, setGroup, classWorks}) => {
    return (
        <thead>
        <tr className={classes.headRow}>
            <th rowSpan="2">
                <FieldSelectbox options={groups} onChange={e => setGroup(e.target.value)}/>
            </th>
            {classWorks.map(classWork =>
                <th className={classes.headCell}>{classWork.name}</th>
            )}
        </tr>
        <tr className={classes.headRow}>
            {classWorks.map(classWork =>
                <th className={classes.headCell}>{classWork.date}</th>
            )}
        </tr>
        </thead>
    );
};

export default TimetableHead;