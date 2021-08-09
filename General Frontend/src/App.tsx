import React from 'react';
@import './App.scss'; // this'll be deprecated by scss soon in favour of @use but that's not supported by CRA
import Landing from './pages/Landing';

// simply loads the landing page for now, could be used for other preliminary tasks later 
function App() {
  return (
    <div className="App">
        <Landing/>
    </div>
  );
}

export default App;
