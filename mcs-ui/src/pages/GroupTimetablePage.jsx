import React, {useEffect, useState} from 'react';
import {fetchGroups, fetchGroupTimetable} from "../API/fetchers";
import FieldSelectbox from "../components/UI/FieldSelectbox/FieldSelectbox";
import {EMPTY_OPTION} from "../core/constants/ui";

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
        <div>
            <h1>Занятия взводов</h1>
            <div style={{width: "80%"}}>
                <table>
                    <thead>
                    <tr>
                        <th>
                            <FieldSelectbox options={groups} onChange={e => setNowGroup(e.target.value)}/>
                        </th>
                        {nowTimetable?.classes.map(classWork =>
                            <th>{classWork.name}</th>
                        )}
                    </tr>
                    </thead>
                    <tbody>
                    {nowTimetable?.rows.map(row =>
                        <tr>
                            <td>{row.fio}</td>
                            {row.results.map(result =>
                                <td>{result.mark}</td>
                            )}
                        </tr>
                    )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default GroupTimetablePage;