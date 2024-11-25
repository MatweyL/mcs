import React, {useEffect, useState} from 'react';
import {fetchGroups, fetchGroupTimetable} from "../API/fetchers";
import {EMPTY_OPTION} from "../core/constants/ui";
import TimetableRow from "../components/UI/TimetableRow/TimetableRow";
import TimetableHead from "../components/UI/TimetableHead/TimetableHead";
import CreateTaskForm from "../components/UI/CreateTaskForm/CreateTaskForm";
import {useRefreshTimetable} from "../hooks/useRefreshTimetable";
import FieldSelectbox from "../components/UI/FieldSelectbox/FieldSelectbox";
import Actions from "../core/constants/actions";
import {useDispatch} from "react-redux";
import FormButton from "../components/UI/FormButton/FormButton";

const GroupTimetablePage = () => {
    const [groups, setGroups] = useState([]);
    const [nowGroup, setNowGroup] = useState('');
    const [nowTimetable, setNowTimetable] = useState({rows: [], classes: []})
    const [visible, setVisible] = useState(false);

    const dispatch = useDispatch();

    const needRefresh = useRefreshTimetable();

    useEffect(() => {
        fetchGroups().then(groups => setGroups([EMPTY_OPTION, ...groups]));
    }, []);

    useEffect(() => {
        if (nowGroup) {
            fetchGroupTimetable(nowGroup)
                .then(timetable => setNowTimetable(timetable));
        } else {
            setNowTimetable({rows: [], classes: []})
        }
    }, [nowGroup, needRefresh])

    const refreshTimetable = () => {
        dispatch({type: Actions.TASKS_ISSUED})
    }

    return (
        <div style={{width: "100%"}}>
            <div style={{display: "flex", justifyContent: "center"}}>
                <h1>Занятия взводов</h1>
            </div>
            <div style={{width: "100%", display: "flex", justifyContent: "center"}}>
                <div style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    flexDirection: "column",
                    width: 'fit-content'
                }}>
                    <div style={{display: "flex"}}>
                        <p>Укажите взвод</p>
                        <FieldSelectbox options={groups} onChange={e => setNowGroup(e.target.value)}/>
                    </div>
                    {nowGroup &&
                        <div style={{display: "flex"}}>
                            <div style={{width: '150px', padding: "5px"}}>
                                <FormButton label={"Обновить таблицу"} onClick={() => refreshTimetable()}/>
                            </div>
                            <div style={{width: '150px', padding: "5px"}}>
                                <FormButton label={"Выдать задание"} onClick={() => setVisible(true)}/>
                            </div>
                            <div>
                                <CreateTaskForm group={nowGroup} visible={visible} setVisible={setVisible}/>
                            </div>
                        </div>
                    }
                </div>
            </div>
            <div>
                {nowGroup &&
                    <div style={{display: "flex"}}>
                        <table style={{borderCollapse: "collapse"}}>
                            <TimetableHead classWorks={nowTimetable.classes} rowsAmount={nowTimetable.rows.length}/>
                            <tbody>
                            {nowTimetable?.rows.map((row, index) =>
                                <TimetableRow key={index} row={row}/>
                            )}
                            </tbody>
                        </table>
                    </div>
                }
            </div>
        </div>
    );
};

export default GroupTimetablePage;