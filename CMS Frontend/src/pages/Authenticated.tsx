import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Navbar from "../components/shared/Navbar";
import Landing from "./Landing";
import NotFound from "./NotFound";
import useCognitoToken from "../api/cognito";
import { QueryClient, useQueryClient } from "react-query";
import { decode } from "jsonwebtoken";
import { useEffect, useState } from "react";
import UnitRouter from "./Units/UnitRouter";
import CareerRouter from "./CareerRouter";
import MajorRouter from "./MajorRouter";
import SpecializationRouter from "./SpecializationRouter";

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
  const [username, setUsername] = useState("");
  useCognitoToken();
  useEffect(() => {
    window.setTimeout(() => {
      decodeLoop(setUsername, client);
    }, 300); // takes a bit before id token is ready
  }, [client])
  return (
    <>
      <Router>
        <Navbar username={username} />
        <Switch>
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
          <Route>
            <NotFound />
          </Route>
        </Switch>
      </Router >
    </>
  )
}