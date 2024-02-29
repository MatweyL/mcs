import LoginPage from "../pages/LoginPage";
import SessionListPage from "../pages/SessionListPage";
import ScreenPage from "../pages/ScreenPage";

export class RoutePaths {
    static LOGIN = '/login';
    static SESSIONS = '/sessions';
    static SCREEN = '/screen';
    static ANY = '/*';
}


export const routes = [
    {name: "Список сессий", to: RoutePaths.SESSIONS, element: SessionListPage},
    {name: "Настройка", to: RoutePaths.SCREEN, element: ScreenPage},
    {name: "Список сессий", to: RoutePaths.ANY, element: SessionListPage},
]

export const defaultRoutes = [
    {name: "Вход", to: RoutePaths.LOGIN, element: LoginPage},
    {name: "Вход", to: RoutePaths.ANY, element: LoginPage},
]