import { Route, Switch } from "react-router-dom";
import styled from "styled-components";
import CreateSpecialization from "./CreateSpecialization";
import NotFound from "./NotFound";
import SpecializationManagement from "./SpecializationManagement";

function SpecializationRouter(props: DefaultProps) {

  return (
    <Switch>
      <Route exact path="/specializations">
        <SpecializationManagement username={props.username} />
      </Route>
      <Route exact path="/specializations/create">
        <CreateSpecialization />
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