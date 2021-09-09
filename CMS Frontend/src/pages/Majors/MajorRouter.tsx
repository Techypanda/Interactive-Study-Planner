import { Route, Switch } from "react-router-dom";
import styled from "styled-components";
import CreateMajor from "./CreateMajor";
import MajorManagement from "./MajorManagement";
import NotFound from "../NotFound";
import ViewMajor from "./ViewMajor";
import EditMajor from "./EditMajor";

function MajorRouter(props: DefaultProps) {

  return (
    <Switch>
      <Route exact path="/majors">
        <MajorManagement username={props.username} />
      </Route>
      <Route exact path="/majors/create">
        <CreateMajor />
      </Route>
      <Route exact path="/majors/view/:MajorCode">
        <ViewMajor />
      </Route>
      <Route exact path="/majors/edit/:MajorCode">
        <EditMajor />
      </Route>
      <Route>
        <NotFound />
      </Route>
    </Switch>
  )
}

export default styled(MajorRouter)`
`;
//<UnitManagement username={props.username} />