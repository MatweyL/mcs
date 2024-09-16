import LoginPage from "../pages/LoginPage";
import SessionListPage from "../pages/SessionListPage";
import ScreenPage from "../pages/ScreenPage";
import CallSessionPage from "../pages/CallSessionPage";
import CallRoomPage from "../pages/CallRoomPage";

export class RoutePaths {
    static LOGIN = '/login';
    static SESSIONS = '/sessions';
    static SCREEN = '/screen';
    static CALL_SESSION = '/call-session';
    static ROOM = '/room';
    static ROOM_ANY = '/room/:id/:params';
    static ANY = '/*';
}


export const routes = [
    {name: "Список сессий", to: RoutePaths.SESSIONS, element: SessionListPage},
    {name: "Настройка", to: RoutePaths.SCREEN, element: ScreenPage},
    {name: "Сеансы", to: RoutePaths.CALL_SESSION, element: CallSessionPage},
    {name: "Сеанс", to: RoutePaths.ROOM_ANY, element: CallRoomPage},
    {name: "Список сессий", to: RoutePaths.ANY, element: SessionListPage},
]

export const defaultRoutes = [
    {name: "Вход", to: RoutePaths.LOGIN, element: LoginPage},
    {name: "Вход", to: RoutePaths.ANY, element: LoginPage},
]