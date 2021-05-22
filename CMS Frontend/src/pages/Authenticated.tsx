import { Box, Typography } from "@material-ui/core";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Navbar from "../components/shared/Navbar";
import { DefaultProps } from "../types";
import Landing from "./Landing";
import NotFound from "./NotFound";

export default function Authenticated(props: DefaultProps) {
  return (
    <>
      <Navbar />
      <Router>
        <Switch>
          <Route exact path="/">
            <Landing />
          </Route>
          <Route>
            <NotFound />
          </Route>
        </Switch>
      </Router >
    </>
  )
}