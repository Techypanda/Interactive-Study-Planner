import { Box, Typography } from "@material-ui/core";
import { useEffect } from "react";
import { useQuery, useQueryClient } from "react-query";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Navbar from "../components/shared/Navbar";
import { DefaultProps } from "../types";
import Landing from "./Landing";
import NotFound from "./NotFound";
import axios, { AxiosError } from 'axios';
import useCognitoToken from "../api/cognito";

export default function Authenticated(props: DefaultProps) {
  useCognitoToken();
  return (
    <>
      <Navbar />
      <Router>
        <Switch>
          <Route exact path="/">
            <Landing />
          </Route>
          <Route>
            <NotFound />
          </Route>
        </Switch>
      </Router >
    </>
  )
}