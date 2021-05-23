import { Box, Typography } from "@material-ui/core";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Navbar from "../components/shared/Navbar";
import { CognitoJWT, DefaultProps } from "../types";
import Landing from "./Landing";
import NotFound from "./NotFound";
import useCognitoToken from "../api/cognito";
import { QueryClient, useQueryClient } from "react-query";
import { decode } from "jsonwebtoken";
import { useEffect, useState } from "react";
import UnitManagement from "./UnitManagement";
import MajorManagement from "./MajorManagement";
import SpecializationManagement from "./SpecializationManagement";
import CareerManagement from "./CareerManagement";

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
  }, [ client ])
  return (
    <>
      <Router>
        <Navbar username={username} />
        <Switch>
          <Route exact path="/">
            <Landing username={username} />
          </Route>
          <Route path="/units">
            <UnitManagement />
          </Route>
          <Route path="/majors">
            <MajorManagement />
          </Route>
          <Route path="/specializations">
            <SpecializationManagement />
          </Route>
          <Route path="/careers">
            <CareerManagement />
          </Route>
          <Route>
            <NotFound />
          </Route>
        </Switch>
      </Router >
    </>
  )
}