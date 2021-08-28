import React from 'react';
import './style.scss';
import { DefaultProps } from './types';
import Authenticated from './pages/Authenticated';
import Authenticate from './pages/Authenticate';

function TokenExpired() {
  if (sessionStorage.getItem('rToken') && sessionStorage.getItem('rTokenExpiry')) {
    try {
      return !(new Date(new Date().getTime() + (2 * 24 * 60 * 60 * 1000)) < new Date(sessionStorage.getItem('rTokenExpiry')!)); // if theres atleast 2 days left on token were ok
    } catch {
      sessionStorage.removeItem('rToken');
      sessionStorage.removeItem('rTokenExpiry');
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
