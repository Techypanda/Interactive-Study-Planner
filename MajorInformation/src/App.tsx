import React from 'react';
import './App.css';
import './MajorInfo';
import './types.d.ts';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <MajorInfo majorCode={ParseCode()}/>
      </header>
    </div>
  );
}

function ParseCode()
{
  return ;
}

export default App;
