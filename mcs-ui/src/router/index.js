import LoginPage from "../pages/LoginPage";
import SessionListPage from "../pages/SessionListPage";
import ScreenPage from "../pages/ScreenPage";

export const routes = [
    {name: "Вход", to: "/login", element: LoginPage},
    {name: "Вход", to: "/*", element: LoginPage},
    {name: "Список сессий", to: "/sessions", element: SessionListPage},
    {name: "Настройка", to: "/screen", element: ScreenPage},
]
