import './App.css';
import InformationPage from './Components/InformationPage';
import axios from 'axios';

function App(unitValues) {
  return (
    <div className="unitInformationPage">
      <InformationPage unitTitle={'onGod'} unitCode={'justLikeThat'} unitText={'yaylol'}/>
    </div>
  );
}

export default App;
