import { Route, Switch } from "react-router-dom";
import styled from "styled-components";
import CreateSpecialization from "./CreateSpecialization";
import NotFound from "../NotFound";
import SpecializationManagement from "./SpecializationManagement";
import ViewSpecialization from "./ViewSpecialization";
import EditSpec from "./EditSpec";

function SpecializationRouter(props: DefaultProps) {

  return (
    <Switch>
      <Route exact path="/specializations">
        <SpecializationManagement username={props.username} />
      </Route>
      <Route exact path="/specializations/create">
        <CreateSpecialization />
      </Route>
      <Route exact path="/specializations/view/:SpecCode">
        <ViewSpecialization />
      </Route>
      <Route exact path="/specializations/edit/:SpecCode">
        <EditSpec />
      </Route>
      <Route>
        <NotFound />
      </Route>
    </Switch>
  )
}

export default styled(SpecializationRouter)`
`;
//<UnitManagement username={props.username} />