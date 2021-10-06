import styled from "styled-components";
import { DefaultProps } from "./types";
import { Switch, Route, useLocation } from "react-router-dom";
import Landing from './pages/Landing';
import ViewAllCareers from './pages/ViewAllCareers';
import ViewAllUnits from './pages/ViewAllUnits';
import PlannerInitialPage from './pages/PlannerInitialPage';
import InfoPageRouter from './pages/InfoPageRouter';
import TopdownInitial from './pages/TopdownInitial';
import TopdownFilled from './pages/TopdownFilled';
import {
  TransitionGroup
} from "react-transition-group";
import { Fade } from "@material-ui/core";
import UnitsFirst from "./pages/UnitsFirst";
import Timetable from "./pages/Timetable";

function Router(props: DefaultProps) {
  const location = useLocation();
  return (
    <TransitionGroup>
      <Fade
        key={location.key}
      >
        <TransitionGroup>
          <Switch>
            <Route exact path="/">
              <Landing />
            </Route>
            <Route exact path="/ViewAllCareers">
              <ViewAllCareers />
            </Route>
            <Route exact path="/PlannerInitialPage">
              <PlannerInitialPage />
            </Route>
            <Route path="/InfoPage">
              <InfoPageRouter />
            </Route>
            <Route exact path="/ViewAllUnits">
              <ViewAllUnits />
            </Route>
            <Route exact path="/TopdownInitial">
              <TopdownInitial />
            </Route>
            <Route exact path="/TopdownFilled">
              <TopdownFilled />
            </Route>
            <Route exact path="/unitsfirst">
              <UnitsFirst />
            </Route>
            <Route exact path="/bottomup">
              <UnitsFirst />
            </Route>
            <Route exact path="/timetable">
              <Timetable />
            </Route>
            <Route>
              <h1>Error 404 not found</h1> {/* TODO: Make a 404 Page */}
            </Route>
          </Switch>
        </TransitionGroup>
      </Fade>
    </TransitionGroup>
  )
}
export default styled(Router)`
`;
