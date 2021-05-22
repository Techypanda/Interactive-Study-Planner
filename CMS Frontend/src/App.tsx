import React from 'react';
import './style.scss';
import { DefaultProps } from './types';
import Authenticated from './pages/Authenticated';
import Authenticate from './pages/Authenticate';

function TokenExpired() {
  if (localStorage.getItem('rToken') && localStorage.getItem('rTokenExpiry')) {
    try {
      return !(new Date(new Date().getTime() + (2 * 24 * 60 * 60 * 1000)) < new Date(localStorage.getItem('rTokenExpiry')!)); // if theres atleast 2 days left on token were ok
    } catch {
      localStorage.removeItem('rToken');
      localStorage.removeItem('rTokenExpiry');
      return true;
    }
  }
  return true;
}

function App(props: DefaultProps) {
  return (
    <>
      { !TokenExpired()
        && <Authenticated />
      }
      { TokenExpired()
        && <Authenticate />
      }
    </>
  );
}

export default App;
