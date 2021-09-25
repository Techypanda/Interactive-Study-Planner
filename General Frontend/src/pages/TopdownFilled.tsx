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
import Error from '../components/shared/Error';
import IconButton from '@material-ui/core/IconButton'
import ClearIcon from '@material-ui/icons/Clear'
import { common, red } from '@material-ui/core/colors'
import { BounceLoader } from "react-spinners";

import { useLocation, useHistory } from 'react-router-dom';
import { Location } from 'history'
import { useCallback } from 'react';
//import { useCareers, useMajors, useUnits } from '../components/shared/hooks';
//import { useCareer } from '../components/shared/hooks';
import { useCareers, useMajors, useUnits } from '../components/shared/hooks'
import { createPartiallyEmittedExpression } from 'typescript';


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

function backFunction() { 
    alert(1)
}

export default function TopdownFilled(props: MajorProps) { 
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
        return (<BounceLoader color="#1473AB" loading={true} size={150}/>)
    }

    let careerResponseData = careers.data?.data!;
    let majorResponseData = majors.data?.data!;
    let unitResponseData = units.data?.data!;


    if(!careerResponseData || !majorResponseData || !unitResponseData) { 
        return <Error promptTitle="Request Error" promptContent={error as string} showPrompt={true} onAccept={() => backFunction() } />
    } else { 

        
        //Let us choose some arbitrary career for the time being, (2)
        //As well as a random major
        //Add all these units to 'majorPrereqs array

        var someMajor = majorResponseData[0]
        var majorPrereqs : string[] = [];
        for(var i = 0; i < someMajor.Units.length; i++) { 
            majorPrereqs.push(someMajor.Units[i])
        }
        for(i = 0; i < commonUnits.length; i++) {    
            if(!(majorPrereqs.includes(commonUnits[i]))) {
                majorPrereqs.push(commonUnits[i])
            }
        }

        //Now we need to go through the pre requisites of these pre requisites
        var count = 0;
        while(count < 3) {  //will fix this - it works but is just ugly as hell. Basically adds pre requisites to majorPrereqs for each count increment. Typically only takes 2 iterations max
            for(i = 0; i < majorPrereqs.length; i++) { 
                for(var j = 0; j < unitResponseData.length; j++) { 
                    if(unitResponseData[j].UnitCode === majorPrereqs[i]) { 
                        if(unitResponseData[j].Prerequistes.length > 1) {  //ARRAY OF 'ANDS'
                            for(var k = 0; k < unitResponseData[j].Prerequistes.length; k++) { 
                                if(unitResponseData[j].Prerequistes[k].length > 1) {  //Array of ANDS with ORs
                                    var combinedUnit = unitResponseData[j].Prerequistes[k][0] + " OR " + unitResponseData[j].Prerequistes[k][1]
                                    if(!(majorPrereqs.includes(combinedUnit))) { 
                                        majorPrereqs.push(combinedUnit)
                                    }
                                } else {  //Just ANDs, no ORs
                                    if(!(majorPrereqs.includes(unitResponseData[j].Prerequistes[k][0]))) { 
                                        let isnum = /^\d+$/.test(unitResponseData[j].Prerequistes[k][0]) //get rid of nasty old units, I don't think they are used at all anymore
                                        if(!isnum) { 
                                            majorPrereqs.push(unitResponseData[j].Prerequistes[k][0])
                                        }
                                    }
                                }
                            }
                        } else {  //No ands at all 
                            if(unitResponseData[j].Prerequistes[0].length > 1) {  //contains OR i.e., UNIT1 or UNIT2
                                combinedUnit = unitResponseData[j].Prerequistes[0][0] + " OR " + unitResponseData[j].Prerequistes[0][1];
                                if(!(majorPrereqs.includes(combinedUnit))) { 
                                    majorPrereqs.push(combinedUnit);
                                }
                            } else { 
                                if(!(majorPrereqs.includes(unitResponseData[j].Prerequistes[0][0]))) { 
                                    if(unitResponseData[j].Prerequistes[0][0] !== "") {
                                        majorPrereqs.push(unitResponseData[j].Prerequistes[0][0])
                                    }
                                }
                            }
                        }
                    }
                }
            }
            count++;
        }


        for(i = 0; i < majorPrereqs.length; i++) {
            if(majorPrereqs[i].includes("CMHL1000")) {  //weird pre req despite being common unit in first year 
                majorPrereqs.splice(i, 1)
                i--;
            }
            if(majorPrereqs[i].includes("NURS1000")) {  //weird pre req despite being common unit in first year
                majorPrereqs.splice(i, 1)
                i--;
            }
        }


        var unitsToDo : string[] = []; //This is the actual list of units provided to the student that will guide the student to the career



        for(i = 0; i < majorPrereqs.length; i++) { 
            if(!(majorPrereqs[i].includes("OR"))) { 
                unitsToDo.push(majorPrereqs[i])
            } else { 
                var word1 = majorPrereqs[i].slice(0, 8);
                var word2 = majorPrereqs[i].slice(12, 21)
                for(j = 0; j < unitResponseData.length; j++) { 
                    if(unitResponseData[j].UnitCode === word1) { 
                        for(k = 0; k < unitResponseData[j].Prerequistes.length; k++) { 
                            if(unitsToDo.includes(unitResponseData[j].Prerequistes[k][0])) { 
                                if(!(unitsToDo.includes(word1))) { 
                                    unitsToDo.push(word1)
                                }
                            }
                        }
                    } else if (unitResponseData[j].UnitCode === word2) { 
                        for(k = 0; k < unitResponseData[j].Prerequistes.length; k++) { 
                            if(unitsToDo.includes(unitResponseData[j].Prerequistes[k][0])) { 
                                if(!(unitsToDo.includes(word2))) { 
                                    unitsToDo.push(word2);
                                }
                            }
                        }
                    }
                }
            }
        }





        for(i = 0; i < commonUnits.length; i++) { 
            if(!(unitsToDo.includes(commonUnits[i]))) { 
                unitsToDo.push(commonUnits[i])
            }
        }


        
        console.log(unitsToDo); //This is all major units with their pre reqs and the pre reqs pre reqs satisfied

        //All that's left is to add career units and check for pre reqs




        return ( 
            <>
                <Navbar />
                <Grid container 
                    className={classes.nonNavBar} 
                    justify={'space-between'}
                    alignItems={'stretch'}
                >
                    <Grid item xs={2}>
                        <CurrentPlan 
                            majorCode={majorResponseData[0].MajorCode}
                            majorUnits={majorResponseData[0].Units}
                            majorName={majorResponseData[0].Name}
                        />
                    </Grid>
                    <Grid item xs={8} className={classes.test}>
                        <TopDownFilledMain />
                    </Grid>

                    <Grid item xs={2}>
                        <AvailableCareersList />
                    </Grid>
                </Grid>
                <p>l</p>
            </>
        )
    }
}