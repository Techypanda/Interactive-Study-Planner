import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
async function test () {
  await fetch('https://c7u1a16o0f.execute-api.ap-southeast-2.amazonaws.com/Prod/getunit?code=ASIA3001').then((response) => { 
    return response.json().then((data) => {
        console.log(data);
        return data;
    }).catch((err) => {
        console.log(err);
    }) 
  });
}

const unitValues = test();

ReactDOM.render(
  <React.StrictMode>
    <App unitValues/>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
