import { BrowserRouter as Router } from "react-router-dom";
import { RoutesConfig } from "./routes";
import { Provider } from "react-redux";
import { store } from "./Store";

function App() {
    return (
        <Provider store={store}>
            <Router>
                <div className="App">
                    <RoutesConfig />
                </div>
            </Router>
        </Provider>
    );
}

export default App;
