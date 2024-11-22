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

export const fetchDevices = async () => (await API.getDevices());

export const fetchTrainingTypes = async (device) => (await API.getTrainingTypes(device));

export const fetchDescription = async (sessionId) => (await API.getTaskDescription(sessionId)).description

export const fetchTemplate = async (training) => (await API.getTaskTemplate(training)).template