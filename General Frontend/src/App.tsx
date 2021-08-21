import React from 'react';
import './App.scss';
import {BrowserRouter, Switch, Route} from "react-router-dom";
import Landing from './pages/Landing';
import Error from './components/shared/Error';
import ViewAllCareers from './pages/ViewAllCareers';

// could just render the landing page from the index file but opportunities for other
// setup could be done here
function App() {
    return (
	<div className="App">
	    <BrowserRouter>
		<Switch>
		    <Route exact path="/">
			<Landing/>
		    </Route>
		    <Route exact path="/ViewAllCareers">
			<ViewAllCareers/>
		    </Route>
		    <Route>
			<h1>Error 404 not found</h1> 
		    </Route>
		</Switch>
	    </BrowserRouter>
	</div>
    );
}

export default App;
