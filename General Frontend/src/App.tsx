import './App.scss';
import {BrowserRouter, Switch, Route} from "react-router-dom";
import Landing from './pages/Landing';
import ViewAllCareers from './pages/ViewAllCareers';
import ViewAllUnits from './pages/ViewAllUnits';
import PlannerInitialPage from './pages/PlannerInitialPage';
import CoursePlanner from './pages/CoursePlanner';
import InfoPageRouter from './pages/InfoPageRouter';
import TopdownInitial from './pages/TopdownInitial';
import TopdownFilled from './pages/TopdownFilled';
import ViewCareer from './components/shared/ViewCareer';

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
		    <Route exact path="/PlannerInitialPage">
			<PlannerInitialPage/>
		    </Route>
		    <Route exact path="/CoursePlanner">
			<CoursePlanner/>
		    </Route>
		    <Route path="/InfoPage">
			<InfoPageRouter/>
		    </Route>
		    <Route exact path="/ViewAllUnits">
			<ViewAllUnits/>
		    </Route>
		    <Route exact path="/TopdownInitial">
			<TopdownInitial/>
		    </Route>
		    <Route exact path="/TopdownFilled">
			<TopdownFilled />
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
