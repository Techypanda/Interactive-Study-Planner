import React from 'react';
import './App.scss';
import Landing from './pages/Landing';
import ViewCareer from './components/shared/ViewCareer';

// could just render the landing page from the index file but opportunities for other
// setup could be done here
function App() {
  return (
    <div className="App">
        <ViewCareer id="TESTDONTDELETE"/>
    </div>
  );
}

export default App;
