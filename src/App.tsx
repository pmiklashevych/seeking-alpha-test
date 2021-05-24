import React from 'react';
import './App.css';
import Grid from "./components/Grid";

function App() {
    return (
        <div className="App">
            <header className="App-header">
                <Grid width={50} height={50} />
            </header>
        </div>
    );
}

export default App;
