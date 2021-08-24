/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import './App.scss'; // this'll be deprecated by scss soon in favour of @use but that's not supported by CRA
import Landing from './pages/Landing';
//import TopdownFilled from '../pages/TopdownFilled';
import TopdownFilled from './pages/TopdownFilled';

// could just render the landing page from the index file but opportunities for other
// setup could be done here
function App() {
  return (
    <div className="App">
        <TopdownFilled/>
    </div>
  );
}

export default App;
