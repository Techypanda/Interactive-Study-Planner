/* eslint-disable @typescript-eslint/no-unused-vars */
import { makeStyles } from '@material-ui/core/styles';
import Navbar from "../components/shared/Navbar";
import CareersImage from '../src/static/career.jpg'
import { DefaultProps } from "../types";
import styled from 'styled-components'

import React from 'react';
import  { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import { Box, Grid, Typography, Card, CardActions, CardActionArea, CardHeader, CardMedia, CardContent, Paper } from '@material-ui/core';
import CurrentPlan from "../components/shared/CurrentPlan"

const useStyles = makeStyles((theme) => ({ 
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


export default function TopdownFilled() { 
    const classes = useStyles();
    return (
        <>
            <Navbar />
            <Grid container className={classes.nonNavBar}>
            </Grid>
        </>
    )
}