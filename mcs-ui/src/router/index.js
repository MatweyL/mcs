import LoginPage from "../pages/LoginPage";
import SessionListPage from "../pages/SessionListPage";
import ScreenPage from "../pages/ScreenPage";
import CallSessionPage from "../pages/CallSessionPage";
import CallRoomPage from "../pages/CallRoomPage";
import TeacherLoginPage from "../pages/TeacherLoginPage";
import GroupTimetablePage from "../pages/GroupTimetablePage";

export class RoutePaths {
    static LOGIN = '/login';
    static TEACHER_LOGIN = '/teacher';
    static SESSIONS = '/sessions';
    static SCREEN = '/screen';
    static CALL_SESSION = '/call-session';
    static ROOM = '/room';
    static ROOM_ANY = '/room/:id/:params';
    static ANY = '/*';
    static ANY_TEACHER = '/teacher/*';
    static TIMETABLE = '/timetable';
}

export const studentRoutes = [
    {name: "Список сессий", to: RoutePaths.SESSIONS, element: SessionListPage},
    {name: "Настройка", to: RoutePaths.SCREEN, element: ScreenPage},
    {name: "Сеансы", to: RoutePaths.CALL_SESSION, element: CallSessionPage},
    {name: "Сеанс", to: RoutePaths.ROOM_ANY, element: CallRoomPage},
    {name: "Список сессий", to: RoutePaths.ANY, element: SessionListPage},
]

export const teacherRoutes = [
    {name: "Список сессий", to: RoutePaths.ANY, element: GroupTimetablePage},
    {name: "Занятия взводов", to: RoutePaths.TIMETABLE, element: GroupTimetablePage}
]

export const defaultRoutes = [
    {name: "Вход", to: RoutePaths.LOGIN, element: LoginPage},
    {name: "Вход преподавателя", to: RoutePaths.ANY_TEACHER, element: TeacherLoginPage},
    {name: "Вход преподавателя", to: RoutePaths.TEACHER_LOGIN, element: TeacherLoginPage},
    {name: "Вход", to: RoutePaths.ANY, element: LoginPage},
]