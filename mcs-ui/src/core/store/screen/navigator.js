
const NAVIGATOR = "navigator";

/// Навигатор - хранит стек экранов, посещенных пользователем
class Navigator {
    push(item) {
        let navigator = this._get();
        if (navigator.includes(item)) {
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

    tail() {
        let navigator = this._get();
        return navigator.slice(-1)[0];
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
