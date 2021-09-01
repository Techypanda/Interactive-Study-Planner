/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import './App.scss'; // this'll be deprecated by scss soon in favour of @use but that's not supported by CRA
import Landing from './pages/Landing';
//import TopdownFilled from '../pages/TopdownFilled';
import TopDownFilled from './pages/TopdownFilled';
import TopDownInitial from './pages/TopdownInitial'

// could just render the landing page from the index file but opportunities for other
// setup could be done here
function App() {

  return (
    <div className="App">
    </div>
  );
}

export default App;
