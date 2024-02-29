const TOKEN = 'TOKEN'

/**
 * Сервис для работы с пользователем
 */
export class UserService {
    saveToken(token) {
        localStorage.setItem(TOKEN, token);
    }

    getToken() {
        return localStorage.getItem(TOKEN);
    }

    clearToken() {
        localStorage.removeItem(TOKEN)
    }
}