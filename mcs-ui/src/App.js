import RoutedApp from "./RoutedApp";
import {Provider} from "react-redux";
import {store} from "./core/store";

function App() {
    return (
        <main className="container">
            <Provider store={store}>
                <RoutedApp/>
            </Provider>
        </main>
    );
}

export default App;
