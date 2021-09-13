import { Route, Switch } from "react-router-dom";
import styled from "styled-components";
import CreateUnit from "./CreateUnit";
import NotFound from "../NotFound";
import UnitManagement from "./UnitManagement";
import ViewUnit from "./ViewUnit";
import EditUnit from "./EditUnit";

function UnitRouter(props: DefaultProps) {

  return (
    <Switch>
      <Route exact path="/units">
        <UnitManagement username={props.username} />
      </Route>
      <Route exact path="/units/create">
        <CreateUnit />
      </Route>
      <Route exact path="/units/view/:UnitCode">
        <ViewUnit />
      </Route>
      <Route exact path="/units/edit/:UnitCode">
        <EditUnit />
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