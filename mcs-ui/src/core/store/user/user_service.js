const TOKEN = 'TOKEN'

/**
 * Сервис для работы с пользователем
 */
export class UserService {
    async saveToken(token) {
        localStorage.setItem(TOKEN, token);
    }

    async getToken() {
        return Promise.resolve(localStorage.getItem(TOKEN));
    }

    async clearToken() {
        localStorage.removeItem(TOKEN)
    }
}