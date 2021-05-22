import React from 'react';
import './style.scss';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import NotFound from './pages/NotFound';
import { DefaultProps, RefreshToken } from './types';
import Authenticated from './pages/Authenticated';
import Authenticate from './pages/Authenticate';

function TokenExpired(refreshToken: RefreshToken | null) {
  return true;
}

function App(props: DefaultProps) {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          { !TokenExpired(localStorage.getItem('rToken')) 
          && <Authenticated />
          }
          { TokenExpired(localStorage.getItem('rToken')) 
          && <Authenticate />
          }
        </Route>
        <Route>
          <NotFound />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
