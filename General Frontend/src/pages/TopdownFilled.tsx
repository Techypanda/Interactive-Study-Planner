/* eslint-disable @typescript-eslint/no-unused-vars */
import { makeStyles } from '@material-ui/core/styles';
import Navbar from "../components/shared/Navbar";
import CareersImage from '../src/static/career.jpg'
import { DefaultProps, MajorUnitListProps } from "../types";
import styled from 'styled-components'
import List from '@material-ui/core'
import { ListItemSecondaryAction } from '@material-ui/core';
import { ListItem } from '@material-ui/core';
import { ListSubheader } from '@material-ui/core';
import React, {useState, useEffect } from 'react';
import  { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import { Box, Grid, Typography, Card, CardActions, CardActionArea, CardHeader, CardMedia, CardContent, Paper, ListItemText } from '@material-ui/core';
import CurrentPlan from "../components/shared/CurrentPlan"
import TopDownFilledMain from '../components/shared/TopDownFilledMain';
import AvailableCareersList from '../components/shared/AvailableCareersList';
import { MajorProps, CareerListProps } from "../types";
import axios, { AxiosResponse } from 'axios';
import LoadingScreen from '../components/shared/Loading';
import Error from '../components/shared/Error';
import { MajorListProps, CareerProps, CareerPropsList, RequiredUnitsList} from '../types';
import IconButton from '@material-ui/core/IconButton'
import ClearIcon from '@material-ui/icons/Clear'
import { red } from '@material-ui/core/colors'

import { useLocation, useHistory } from 'react-router-dom';
import { Location } from 'history'
import { useCallback } from 'react';
import { useCareers, useMajors, useUnits } from '../components/shared/hooks';


const useStyles = makeStyles((theme) => ({ 
    careersList: { 
        'width': 300,
    },
    nonNavBar: {
        'height': '90vh'
    },
    test: {
        'margin-top': 50,
    }, 
    test2: { 
        'justifyContent': 'space-between'
    },
    root: { 
        width:'100%',
        maxWidth: 360,
        backgroundColor: theme.palette.background.paper,
        outline: '1px solid #d9b362',
        height: '100%'
    },
}))

let checker = (arr : String[], target : String[]) => target.every(v => arr.includes(v));
function backFunction() { 
    alert(1);
}
export default function TopdownFilled(props: MajorProps) { //This should be just a career code no?
    var careerName : String;
    const classes = useStyles();
    const history = useHistory();
    const id = history.location.state as string;
    const [error, setErrorContent] = useState<string>();
    const careers = useCareers();
    const majors = useMajors();
    const units = useUnits();

    const commonUnits = [ 
      "MEDI1000",
      "HUMB1000",
      "BIOL1004",
      "CHEM1007",
      "INDH1006",
      "EPID1000",
      "HUMB1001",
      "GENE1000" 
    ]


    if(careers.isLoading || majors.isLoading || units.isLoading) { 
        return (<LoadingScreen/>)
    }

    let careerResponseData = careers.data?.data!;
    let majorResponseData = majors.data?.data!;
    let unitResponseData = units.data?.data!;


    if(!careerResponseData || !majorResponseData || !unitResponseData) { 
        return <Error promptTitle="Request Error" promptContent={error as string} showPrompt={true} onAccept={() => backFunction() } />
    } else { 
       

        //Now we need to check if we satisfy prerequisites
        return (
            <>
                <Navbar />
                <Grid container className={classes.nonNavBar} justify={'space-between'} alignItems={'stretch'}>
                    <Grid item xs={2}>
                        <CurrentPlan
                            majorCode={majorResponseData[0].MajorCode}
                            majorUnits={majorResponseData[0].Units}
                            majorName={majorResponseData[0].Name}
                        />
                    </Grid>
                    <Grid item xs={8} className={classes.test}>
                        <TopDownFilledMain/>
                    </Grid>

                    <Grid item xs={2}>
                        <AvailableCareersList />
                    </Grid>
                </Grid>
            </>
        )
    }
}

        
        /*return (
            <>
                <Navbar />
                <Grid container className={classes.nonNavBar} justify={'space-between'} alignItems={'stretch'}>
                    <Grid item xs={2}>
                        <CurrentPlan
                            majorCode={majorResponseData[majorResponseIndex].MajorCode}
                            majorUnits={majorResponseData[majorResponseIndex].Units}
                            majorName={majorResponseData[majorResponseIndex].Name}
                        />
                    </Grid>
                    <Grid item xs={8} className={classes.test}>
                        <TopDownFilledMain/>
                    </Grid>

                    <Grid item xs={2}>
                        <AvailableCareersList />
                    </Grid>
                </Grid>
            </>
        )
    }
}
*/