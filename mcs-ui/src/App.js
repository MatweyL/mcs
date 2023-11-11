import Screen from "./components/Screen";
import ManagedScreen from "./components/ManagedScreen";
import ReducerManagedScreen from "./components/ReducerManagedScreen";

function App() {

    return (
        <main className="container">
            <div className="body">
                <ReducerManagedScreen/>
            </div>
        </main>
    );
}

export default App;
