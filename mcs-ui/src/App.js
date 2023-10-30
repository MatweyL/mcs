import './App.css';
import Screen from "./components/Screen";

function App() {

    return (
        <main className="container">
            <div className="body">
                <Screen/>
                <div className="keyboard">
                    <div className="keys-row">
                        <div className="key">^</div>
                        <div className="key">/\</div>
                        <div className="key">^</div>
                    </div>
                    <div className="keys-row">
                        <div className="key">Связь</div>
                        <div className="key">\/</div>
                        <div className="key">Конец</div>
                    </div>
                    <div className="keys-row">
                        <div className="key">1</div>
                        <div className="key">2</div>
                        <div className="key">3</div>
                    </div>
                    <div className="keys-row">
                        <div className="key">4</div>
                        <div className="key">5</div>
                        <div className="key">6</div>
                    </div>
                    <div className="keys-row">
                        <div className="key">7</div>
                        <div className="key">8</div>
                        <div className="key">9</div>
                    </div>
                    <div className="keys-row">
                        <div className="key">*</div>
                        <div className="key">0</div>
                        <div className="key">#</div>
                    </div>
                </div>
            </div>
        </main>
    );
}

export default App;
