import React, {useState} from 'react';
import './App.css';
import Terminal from "react-bash";
import rclone from "./extenstions/rclone";
import clearExt from "./extenstions/clear";

function App() {

    const [history, setHistory] = useState([{ value: 'Type `help` to begin' }]);
    const [isLoading, setIsLoading] = useState(false);

    const terminalExtensions = {
        rclone: rclone(history, setHistory, setIsLoading),
        clear: clearExt(history, setHistory, setIsLoading),
    };

    return (
        <div style={{height: "80vh"}} data-test="appComponent">
            <Terminal
                history={history}
                theme={Terminal.Themes.DARK}
                extensions={terminalExtensions}
                prefix="rclone@default"
            />
            <div className="StatusBar">
                { isLoading ? "Loading..." : "Ready" }
            </div>
        </div>

    );
}

export default App;