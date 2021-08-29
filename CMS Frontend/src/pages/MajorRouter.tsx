import { Route, Switch } from "react-router-dom";
import styled from "styled-components";
import CreateMajor from "./CreateMajor";
import MajorManagement from "./MajorManagement";
import NotFound from "./NotFound";

function MajorRouter(props: DefaultProps) {

  return (
    <Switch>
      <Route exact path="/majors">
        <MajorManagement username={props.username} />
      </Route>
      <Route exact path="/majors/create">
        <CreateMajor />
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