import React, {useEffect, useState} from 'react';
import {fetchGroups, fetchGroupTimetable} from "../API/fetchers";
import {EMPTY_OPTION} from "../core/constants/ui";
import TimetableRow from "../components/UI/TimetableRow/TimetableRow";
import TimetableHead from "../components/UI/TimetableHead/TimetableHead";

const GroupTimetablePage = () => {
    const [groups, setGroups] = useState([]);
    const [nowGroup, setNowGroup] = useState('');
    const [nowTimetable, setNowTimetable] = useState({rows: [], classes: []})

    useEffect(() => {
        fetchGroups().then(groups => setGroups([EMPTY_OPTION, ...groups]));
    }, []);

    useEffect(() => {
        if (nowGroup) {
            fetchGroupTimetable(nowGroup)
                .then(timetable => setNowTimetable(timetable));
        }
    }, [nowGroup])

    return (
        <div style={{width: "100%"}}>
            <div style={{display: "flex", justifyContent: "center"}}>
                <h1>Занятия взводов</h1>
            </div>
            <div>
                <table style={{borderCollapse: "collapse"}}>
                    <TimetableHead groups={groups} setGroup={setNowGroup} classWorks={nowTimetable.classes} rowsAmount={nowTimetable.rows.length}/>
                    <tbody>
                    {nowTimetable?.rows.map(row =>
                        <TimetableRow row={row}/>
                    )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default GroupTimetablePage;