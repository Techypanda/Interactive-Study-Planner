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
import IconButton from '@material-ui/core/IconButton'
import ClearIcon from '@material-ui/icons/Clear'
import { common, red } from '@material-ui/core/colors'

import { useLocation, useHistory } from 'react-router-dom';
import { Location } from 'history'
import { useCallback } from 'react';
//import { useCareers, useMajors, useUnits } from '../components/shared/hooks';
//import { useCareer } from '../components/shared/hooks';
import { useCareers, useMajors, useUnits, useSpecializations } from '../components/shared/hooks'
import { createPartiallyEmittedExpression } from 'typescript';
import { SupervisedUserCircleSharp } from '@material-ui/icons';
import { findByPlaceholderText } from '@testing-library/react';


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
function updatePlanUnits(allUnits : string[], dataResp : any) { 
    for(var i = 0; i < dataResp.Units.length; i++) { 
        allUnits.push(dataResp.Units[i])
    }
}
function areRemainingMatched(bestMajor : any, careerUnits : string[]) { 
    var matchCount = 0;
    for(var i = 0; i < careerUnits.length; i++) { 
        if(bestMajor.Units.includes(careerUnits[i])) { 
            matchCount++;
        }
    }
    if(matchCount === careerUnits.length) { 
        console.log('true inside of are remanming matched')
        return true;
    }
    return false;
}

function findBestISpecESpec(specResp : any, careerUnits : string[], majorCode : string, specCode : string) { 
    var maxLen = 0;
    var bestISpecESpec;
    var invalid = false;
    for(var i = 0; i < specResp.length; i++) { 
        let intersection = specResp[i].Units.filter((item : any) => careerUnits.includes((item)))
        if(intersection.length != 0) { 
            //check major anti reqs
            for(var j = 0; j < specResp[i].MajorAntiReqs.length; j++) { 
                if(specResp[i].MajorAntiReqs[j].includes(majorCode)) { 
                    invalid = true;
                }
            }
            //check spec anti req
            for(var j = 0; j < specResp[i].SpecAntiReqs.length; j++) { 
                if(specResp[i].SpecAntiReqs[j].includes(specCode)) { 
                    invalid = true;
                }
            }

            //check unit anti req
            for(j = 0; j < specResp[i].UnitAntiReqs.length; j++) { 
                if(careerUnits.includes(specResp[i].UnitAntiReqs[j])) { 
                    invalid = true;
                }
            }
            if(intersection.length > maxLen && !invalid) { 
                maxLen = intersection.length;
                bestISpecESpec = specResp[i]
            }
        }
    }
    return bestISpecESpec;
}

function updateCareerUnits(bestMajor : any, careerUnits : string[]) { 
    for(var i = 0; i < careerUnits.length; i++) { 
        if(bestMajor.Units.includes(careerUnits[i])) { 
            careerUnits.splice(i, 1);
            i--;
        }
    }
}

function findRandMajor(majorResp: any) { 
    var min = 0;
    var max = majorResp.length;
    var randNum = Math.floor(Math.random() * (max - min) + min);
    var randMajor = majorResp[randNum]
    return randMajor
}

function findRandISpec(specResp : any) { 
    var min = 0;
    var max = specResp.length;
    //TODO: MAKE SURE IT ACCOUNTS FOR ANTI REQS OF ALL KINDS
    var randMajorInternal = false;
    while(randMajorInternal === false) { 
        var randNum = Math.floor(Math.random() * (max - min) + min);
        if(specResp[randNum].Internal == true) { 
            return specResp[randNum]
        }
    }
}

function findRandISpecESpec(specResp : any, specCode : string, majorCode : string, careerUnits : string []) { 
    //TODO: Make sure it checks all major anti reqs and spec anti reqs and unit anti reqs
    //make sure it works xD
    var min = 0;
    var max = specResp.length;
    var invalid = false;
    var antiReqsAccountedFor = false;
    while(!antiReqsAccountedFor) { 
        invalid = false;
        var randNum = Math.floor(Math.random() *(max - min) + min);
        //check spec anti reqs
        for(var i = 0; i < specResp[randNum].SpecAntiReqs.length; i++) { 
            if(specResp[randNum].SpecAntiReqs[i].includes(specCode)) { 
                //invalid = false;
                invalid = true;
            }
        }
        //check major anti reqs
        for(i = 0; i < specResp[randNum].MajorAntiReqs.length; i++) { 
            if(majorCode.includes(specResp[randNum].MajorAntiReqs[i])) { 
                invalid = true;
            }
        }
        //check unit anti reqs
        for(i = 0; i < specResp[randNum].UnitAntiReqs.length; i++){ 
            if(careerUnits.includes(specResp[randNum].UnitAntiReqs[i])) { 
                invalid = true;
            }
        }
        if(!invalid) { 
            return specResp[randNum]
        }
    }
}

function findISpec(specResp : any, careerUnits : string[], majorCode : string) { 

    //TODO: make sure it checks all major anti reqs and spec anti reqs and unit anti reqs
    console.log('inside findISpec')
    console.log(majorCode)
    console.log(specResp)
    console.log(careerUnits)
    var maxLen = 0;
    var bestISpec
    var invalid = false;
    for(var i = 0; i < specResp.length; i++) { 
        let intersection = specResp[i].Units.filter((item : any) => careerUnits.includes((item)))
        if(intersection.length != 0 && specResp[i].Internal == true) { 
            //check major anti req
            for(var j = 0; j < specResp[i].MajorAntiReqs.length; j++) { 
                if(specResp[i].MajorAntiReqs[j].includes(majorCode)) { 
                    invalid = true;
                }
            }
            //don't need to check spec anti req since this is the first spec
            //check unit anti req
            for(j = 0; j < specResp[i].UnitAntiReqs.length; j++) { 
                if(careerUnits.includes(specResp[i].UnitAntiReqs[j])) { 
                    invalid = true
                }
            }
            if(intersection.length > maxLen && !invalid) { 
                maxLen = intersection.length;
                bestISpec = specResp[i]
            }
        }
        invalid = false;
    }
    console.log('best ispec step 3 is')
    console.log(bestISpec)
    return bestISpec
}
function findMajor(majorResp : any, careerUnits : string[]) { 
    let maxLen = 0;
    var bestMajor;
    for(var i = 0; i < majorResp.length; i++) { 
        let intersection = majorResp[i].Units.filter((item : any) => careerUnits.includes(item))
        if(intersection.length != 0) { 
            if(intersection.length > maxLen) { 
                maxLen = intersection.length;
                bestMajor = majorResp[i]
            }
        }
    }
    if(bestMajor === undefined) { 
        bestMajor = findRandMajor(majorResp)
    }
    return bestMajor;
}

export default function TopdownFilled(props: MajorProps) { 
    const classes = useStyles();
    const history = useHistory();
    const id = history.location.state as string;
    const [error, setErrorContent] = useState<string>();
    const careers = useCareers();
    const majors = useMajors();
    const units = useUnits();
    const specs = useSpecializations();

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

    if(careers.isLoading || majors.isLoading || units.isLoading || specs.isLoading) { 
        return (<LoadingScreen/>)
    }

    let careerResponseData = careers.data?.data!;
    let majorResponseData = majors.data?.data!;
    let unitResponseData = units.data?.data!;
    let specResponseData = specs.data?.data!;


    if(!careerResponseData || !majorResponseData || !unitResponseData || !specResponseData) { 
        return <Error promptTitle="Request Error" promptContent={error as string} showPrompt={true} onAccept={() => backFunction() } />
    } else { 
        /* TODO: 
            * Check with all other careers manually to ensure above works as expected
            * what if no ispec match at all during steps 3/4 <-- pick a rand spec ? 
            * 
            * Test scenarios:
                * single major and that's all WORKS
                * double major  WORKS
                * major + 1ispec <-- clashing major anti req should NEVER make it through <-- for single anti req this seems to work, as the units will be removed from careerUnits, preventing it from matching  WORKS
                                *<-- also major spec containing OR WORKS
                    * i.e., major match will need to be the major anti req for the best ispec, forcing it to choose next best
                * major + 1ispec <-- clashing unit anti req should NEVER make it through pretty sure this works
                * major + 1ispec valid works
                * major + 1 valid ispec + ispec <-- clashing major anti req - double check logic is identical to ispec. if it is, it works
                * major + 1 valid ispec + ispec <-- clashing spec anti req - double check logic is identical to ispec. if it is, it works
                * major + valid ispec + ispec <-- clashing unit anti req - double check logic is identical to ispec. if it is, it works
                * major + 1 valid ispec + espec <-- clashing major anti req espec is same logic as ispec
                * major + 1 valid ispec + espec <-- clashing spec anti req espec is same logic as ispec
                * major + 1 valid ispec + espec <-- clashing unit anti req espec is same logic as ispec
                * 
                * 
                * 
                * major + 1 valid ispec + electives <-- elective pre reqs contain AND with OR, valid
                * major + 1 valid ispec + electives <-- elective pre reqs contain AND, valid
                * major + 1 valid ispec + electvies <-- elective pre reqs contain OR, valid
                * major + 1 valid ispec + electives <-- above, with the old unit codes, valid
                * major + 1 valid ispec + electives <-- elective pre reqs sum to > 24
                * 
        */

        
        console.log(specResponseData)
        var ourCareer = careerResponseData[0]
        var allUnits : string[] = [];
        for(i = 0; i < commonUnits.length; i++) { 
            allUnits.push(commonUnits[i])
        }




        console.log('career units for testing: ')
        //hardcoding for now to test =)
        var careerUnits = ["BCCB2000","BIOL2001","BIOL3010","BIOL3011","GENE2001","GENE3000","GENE3002","MEDI2010", "HUMB3008"]
        console.log(careerUnits)
        var i;
        var doubleMajorFound = true;
        var bestMajor = findMajor(majorResponseData, careerUnits)

        console.log('out side of findMajor. result is: ')
        console.log(bestMajor)
            var secondBestMajor;

            console.log('career units before')
            console.log(careerUnits)
            updateCareerUnits(bestMajor, careerUnits)
            console.log('career units after')
            console.log(careerUnits)
            console.log('all units before')
            console.log(allUnits)
            updatePlanUnits(allUnits, bestMajor)
            console.log('all units after')
            console.log(allUnits)
            if(careerUnits.length == 0) { 
                console.log(allUnits)
                //alert('done on single major')
                console.log('Finished on a single major lol')
            } else {  //repeat and try find double major
                secondBestMajor = findMajor(majorResponseData, careerUnits)
                
                //if true, we have perfectly matched all career units with 2 majors.
                if(areRemainingMatched(secondBestMajor, careerUnits)) { 
                        updatePlanUnits(allUnits, secondBestMajor)
                } else { 
                    console.log('move onto step 3')
                    doubleMajorFound = false;
                }
            }
        if(!doubleMajorFound){
            var bestISpec;
            console.log(allUnits)
            console.log('in step 3: find best ispec')
            bestISpec = findISpec(specResponseData, careerUnits, bestMajor.MajorCode) //get major code from FIRST major (IGNORE SEOCND)
            if(bestISpec === undefined) {
                bestISpec = findRandISpec(specResponseData)

            }
            console.log('before')
            console.log(allUnits)
            console.log(careerUnits)
            updatePlanUnits(allUnits, bestISpec)
            updateCareerUnits(bestISpec, careerUnits)
            console.log('after')
            console.log(allUnits)
            console.log(careerUnits)
            if(careerUnits.length === 0) { 
                //alert('finished at step 3')
                console.log('finished at step 3')
            } else { 
                //step 4 (find espec or ispec)
                console.log('Starting step 4')
                var bestISpecEspec;
                bestISpecEspec = findBestISpecESpec(specResponseData, careerUnits, bestMajor.MajorCode, bestISpec.SpecializationCode)
                console.log(bestISpecEspec)
                if(bestISpecEspec === undefined) { 
                    console.log('no suitable spec was found, i.e., returned default')
                    bestISpecEspec = findRandISpecESpec(specResponseData, bestISpec.SpecializationCode, bestMajor.MajorCode, careerUnits)
                    console.log(bestISpecEspec)
                }
                console.log('before')
                console.log(allUnits)
                console.log(careerUnits)
                if(areRemainingMatched(bestISpecEspec, careerUnits)) { 
                    console.log('finished at step 4')
                    updatePlanUnits(allUnits, bestISpecEspec)
                    console.log(allUnits)
                } else { 
                    console.log('Find electives, step 5')
                    //step 5 - find matches based on electives
                   
                }
            }

        }
        console.log(allUnits)
   

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
