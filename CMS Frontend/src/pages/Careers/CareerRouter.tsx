import { Route, Switch } from "react-router-dom";
import styled from "styled-components";
import NotFound from "../NotFound";
import CareerManagement from "./CareerManagement";
import CreateCareer from "./CreateCareer";
import ViewCareer from "./ViewCareer";

function CareerRouter(props: DefaultProps) {
  return (
    <Switch>
      <Route exact path="/careers">
        <CareerManagement username={props.username} />
      </Route>
      <Route exact path="/careers/create">
        <CreateCareer />
      </Route>
      <Route exact path="/careers/view/:CareerId">
        <ViewCareer />
      </Route>
      <Route exact path="/careers/edit/:MajorCode">
        {/* <EditMajor /> */}
      </Route>
      <Route>
        <NotFound />
      </Route>
    </Switch>
  )
}

export default styled(CareerRouter)`
`;