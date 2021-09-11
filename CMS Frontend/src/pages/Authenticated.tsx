import { Switch, Route, useLocation } from "react-router-dom";
import Navbar from "../components/shared/Navbar";
import Landing from "./Landing";
import NotFound from "./NotFound";
import useCognitoToken from "../api/cognito";
import { QueryClient, useQueryClient } from "react-query";
import { decode } from "jsonwebtoken";
import {
  TransitionGroup
} from "react-transition-group";
import { useEffect, useState } from "react";
import UnitRouter from "./Units/UnitRouter";
import CareerRouter from "./Careers/CareerRouter";
import MajorRouter from "./Majors/MajorRouter";
import SpecializationRouter from "./Specialization/SpecializationRouter";
import CSV from "./CSV";
import { Fade } from "@material-ui/core";

function decodeLoop(setFunc: React.Dispatch<React.SetStateAction<string>>, client: QueryClient) { // recursive algorithm that just keeps going until it has a username.
  const token = client.getQueryData('token') as string;
  const decoded = decode(token) as CognitoJWT;
  if (decoded) {
    setFunc(decoded["cognito:username"]);
  } else {
    window.setTimeout(() => decodeLoop(setFunc, client), 300);
  }
}

export default function Authenticated(props: DefaultProps) {
  const client = useQueryClient();
  const location = useLocation();
  const [username, setUsername] = useState("");
  useCognitoToken();
  useEffect(() => {
    window.setTimeout(() => {
      decodeLoop(setUsername, client);
    }, 300); // takes a bit before id token is ready
  }, [client])
  return (
    <>
      <Navbar username={username} />
      <TransitionGroup>
        <Fade
          key={location.key}
        >
          <TransitionGroup>
            <Switch location={location}>
              <Route exact path="/">
                <Landing username={username} />
              </Route>
              <Route path="/units">
                <UnitRouter username={username} />
              </Route>
              <Route path="/majors">
                <MajorRouter username={username} />
              </Route>
              <Route path="/specializations">
                <SpecializationRouter username={username} />
              </Route>
              <Route path="/careers">
                <CareerRouter username={username} />
              </Route>
              <Route exact path="/csv">
                <CSV />
              </Route>
              <Route>
                <NotFound />
              </Route>
            </Switch>
          </TransitionGroup>
        </Fade>
      </TransitionGroup>
    </>
  )
}