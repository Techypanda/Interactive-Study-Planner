import React from 'react';
import './App.css';
import Landing from './pages/Landing';

// simply loads the landing page for now, could be used for other preliminary tasks later 
function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Landing/>
      </header>
    </div>
  );
}

export default App;
