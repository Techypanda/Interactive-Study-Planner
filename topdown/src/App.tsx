/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import  { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import { Box, Grid, Typography, Card, CardActions, CardActionArea, CardHeader, CardMedia, CardContent, Paper } from '@material-ui/core';
import './App.css';
import { makeStyles } from '@material-ui/core/styles';
import Navbar from './components/shared/Navbar'
import CareersImage from '../src/static/career.jpg'
import { DefaultProps } from "./types";
//import { styled } from '@material-ui/styles';
import styled from 'styled-components'
import CareerUnitInfoCard from './components/shared/CareerUnitInfoCard';
import Testing from './components/shared/Testing';
import CurrentPlan from './components/shared/CurrentPlan';
import AvailableCareersList from './components/shared/AvailableCareersList';
import TopDownInitialMain from './components/shared/TopDownInitialMain';
import TopDownFilledMain from './components/shared/TopDownFilledMain'
const useStyles = makeStyles((theme) => ({ 
  currentPlanList: { 
    'z-index': 1
  },
  careersList: { 
    'width': 300,
  },
  nonNavBar: {
    'height': '90vh'
  },
  test: {
    'margin-top': 50,
  }
}))
function App(props: DefaultProps) { 
  const classes = useStyles();
  return ( 
    <>
      <Navbar />

      <Grid container justifyContent={'space-between'} alignItems={'stretch'} className={classes.nonNavBar}>
        <Grid item xs={2}>
          <CurrentPlan />
        </Grid>
        <Grid item xs={8} className={classes.test}>
              <TopDownFilledMain />
        </Grid>

        <Grid item xs={2}>
          <AvailableCareersList />
        </Grid>
      </Grid>
    </>
  
  )
}
export default styled(App)`
`;
