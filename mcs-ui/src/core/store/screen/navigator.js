
const NAVIGATOR = "navigator";

/**
 * Навигатор - хранит стек экранов, посещенных пользователем
 */
class Navigator {
    push(item) {
        let navigator = this._get();
        if (navigator.find(i => i.name === item.name)) {
            return;
        }
        navigator.push(item);
        this._set(navigator);
    }

    pop() {
        let navigator = this._get();
        let popped = navigator.pop();
        this._set(navigator);
        return popped;
    }

    tailName() {
        let navigator = this._get();
        const tail = navigator.slice(-1)[0];
        return tail ? tail.name : tail;
    }

    clear() {
        this._set([]);
    }

    _get() {
        let navigator = JSON.parse(localStorage.getItem(NAVIGATOR));
        if (navigator === null) {
            navigator = [];
        }
        return navigator;
    }

    _set(navigator) {
        localStorage.setItem(NAVIGATOR, JSON.stringify(navigator));
    }
}

export const navigator = new Navigator();
