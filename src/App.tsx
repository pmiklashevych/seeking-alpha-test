import React from 'react';
import './App.css';
import Grid from "./components/Grid";

function App() {
    const cells = [
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0],
        [0, 1, 1, 1, 0],
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0]
    ];

    return (
        <div className="App">
            <header className="App-header">
                <Grid width={5} height={5} initialData={cells} />
            </header>

        </div>
    );
}

export default App;
