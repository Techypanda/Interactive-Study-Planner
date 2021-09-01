/* eslint-disable @typescript-eslint/no-unused-vars */
import { makeStyles } from '@material-ui/core/styles';
import Navbar from "../components/shared/Navbar";
import CareersImage from '../src/static/career.jpg'
import { DefaultProps } from "../types";
import styled from 'styled-components'

import React, {useState, useEffect } from 'react';
import  { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import { Box, Grid, Typography, Card, CardActions, CardActionArea, CardHeader, CardMedia, CardContent, Paper } from '@material-ui/core';
import CurrentPlan from "../components/shared/CurrentPlan"
import TopDownFilledMain from '../components/shared/TopDownFilledMain';
import AvailableCareersList from '../components/shared/AvailableCareersList';
import { MajorProps, CareerListProps } from "../types";
import axios from 'axios';



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
    }
}))


export default function TopdownFilled(props: MajorProps) { 
    const base : CareerListProps = {};
    //const test3 : MajorProps = {majorCode:"abcdef"};
    var test3 : MajorProps = {majorCode:props.majorCode};
    const [careerList2, setCareerList] = useState<CareerListProps>(base);
    var [major, setMajor] = useState<MajorProps>(test3);

    async function fetchDataCareer() { 
        try { 
            //Just need to change url to event-get-all-careers and tweak
                //CORS problem, not sure if it's my fault
            const {data} = await axios.get("https://ilur318q9c.execute-api.ap-southeast-2.amazonaws.com/Prod/getallmajors");
            let careerTitles2 : string[] = [];
            for(let i = 0; i < data.length; i++) { 
                careerTitles2[i] = data[i].MajorCode;
            }
            let resp : CareerListProps = { 
                careerList : careerTitles2,
            };
            setCareerList(resp);
        } catch(error) { 
            console.log(error)
        }
    }


    useEffect(() => { 
        fetchDataCareer();
        async function fetchDataMajor() { 
        try { 
            const {data} = await axios.get("https://ilur318q9c.execute-api.ap-southeast-2.amazonaws.com/Prod/getmajor?code=".concat(`${props.majorCode}`));
            let name : string = data[0].Name;
            name = name.charAt(0).toUpperCase() + name.slice(1);
            let resp : MajorProps = { 
                majorCode : data[0].MajorCode,
                majorName : name,
                majorUnits : data[0].Units,
            }
            setMajor(resp);
        } catch(error) { 
            console.log(error);
        }
    }
    fetchDataMajor();
    },[major, props.majorCode]) //idk why this works but it does (y)

    if(major.majorUnits === undefined) { 
        major.majorUnits = [""];
    }

    const classes = useStyles();
    return (
        <>
            <Navbar />
            <Grid container className={classes.nonNavBar} justify={'space-between'} alignItems={'stretch'}>
                <Grid item xs={2}>
                    <CurrentPlan
                        majorCode={major.majorCode}
                        majorName={major.majorName}
                        majorUnits={major.majorUnits}
                    />
                </Grid>

                <Grid item xs={8} className={classes.test}>
                    <TopDownFilledMain />
                </Grid>

                <Grid item xs={2}>
                    <AvailableCareersList careerList={careerList2.careerList} />
                </Grid>
            </Grid>
        </>
    )
}