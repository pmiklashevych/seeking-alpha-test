import React from 'react';
import './App.css';
import Player from './components/Player';

function App() {
    return (
        <div className="App">
            <header className="App-header">
                <Player width={50} height={50} />
            </header>
        </div>
    );
}

export default App;
