import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import styled from "styled-components";
import { DefaultProps } from "../types";
import CreateUnit from "./CreateUnit";
import NotFound from "./NotFound";
import UnitManagement from "./UnitManagement";

function UnitRouter(props: DefaultProps) {

  return (
    <Switch>
      <Route exact path="/units">
        <UnitManagement username={props.username} />
      </Route>
      <Route exact path="/units/create">
        <CreateUnit />
      </Route>
      <Route>
        <NotFound />
      </Route>
    </Switch>
  )
}

export default styled(UnitRouter)`
`;
//<UnitManagement username={props.username} />