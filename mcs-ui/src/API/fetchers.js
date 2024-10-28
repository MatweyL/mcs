import API from "./api";

export const fetchTeachers = async () => (await API.getTeachers()).map(
    user => {
        return {'value': user.uid, 'label': `${user.surname} ${user.name} ${user.patronymic}`}
    }
);

export const fetchStudents = async (groupId) => (await API.getUsersByGroup(groupId)).map(
    user => {
        return {'value': user.uid, 'label': `${user.surname} ${user.name} ${user.patronymic}`}
    }
);

export const fetchGroups = async () => (await API.getGroups()).map(
    group => {
        return {'value': group.uid, 'label': group.name}
    }
);

export const fetchGroupTimetable = async (groupId) => (await API.getGroupTimetable(groupId));