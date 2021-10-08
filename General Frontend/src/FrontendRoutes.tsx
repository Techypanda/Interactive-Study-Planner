import styled from "styled-components";
import { lazy } from "react";
import { DefaultProps } from "./types";
import { Switch, Route, useLocation } from "react-router-dom";
import {
  TransitionGroup
} from "react-transition-group";
import { Fade } from "@material-ui/core";

// Lazy Loaded Pages
const UnitsFirst = lazy(() => import("./pages/UnitsFirst"));
const Timetable = lazy(() => import("./pages/Timetable"));
const NotFound = lazy(() => import("./pages/NotFound"));
const Landing = lazy(() => import('./pages/Landing'));
const ViewAllCareers = lazy(() => import('./pages/ViewAllCareers'));
const ViewAllUnits = lazy(() => import('./pages/ViewAllUnits'));
const PlannerInitialPage = lazy(() => import('./pages/PlannerInitialPage'));
const InfoPageRouter = lazy(() => import('./pages/InfoPageRouter'));
const TopdownInitial = lazy(() => import('./pages/TopdownInitial'));

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
              <NotFound />
            </Route>
          </Switch>
        </TransitionGroup>
      </Fade>
    </TransitionGroup>
  )
}
export default styled(Router)`
`;
