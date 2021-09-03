/* eslint-disable @typescript-eslint/no-unused-vars */
import { CardContent , Grid, CardActions, ListSubheader, AppBar, Toolbar, Typography, Box, List, CardHeader, Avatar, Card, CardMedia, Switch, Checkbox } from '@material-ui/core';
//import { DefaultProps } from '../../types';
import { DefaultProps } from '../types';
import { borders, positions } from '@material-ui/system';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { red } from '@material-ui/core/colors';
import IconButton from '@material-ui/core/IconButton';
import ClearIcon from '@material-ui/icons/Clear';
import BookOutlined from '@material-ui/icons/BookOutlined';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import { CheckBox } from '@material-ui/icons';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction'
import WifiIcon from '@material-ui/icons/Wifi'
import ListItemText from '@material-ui/core/ListItemText';
import CommentIcon from '@material-ui/icons/Comment';
//import CareerUnitInfoCard from './CareerUnitInfoCard'
import CareerUnitInfoCard from '../components/shared/CareerUnitInfoCard'
import TopDownFilledMain from '../components/shared/TopDownFilledMain';
import CurrentPlan from '../components/shared/CurrentPlan';
import Navbar from '../components/shared/Navbar';
import AvailableCareersList from '../components/shared/AvailableCareersList';
//import TopDownInitialMain from '../components/shared/TopDownInitialMain';
import TopDownInitialMain from '../components/shared/TopDownInitialMain';
import EmptyCurrentPlan from '../components/shared/EmptyCurrentPlan';
import axios from 'axios'
import ReactDOM from 'react-dom';
import { CareerProps,  ErrorProps,  MajorProps, CareerListProps} from "../types";
import React, {useState, useEffect } from 'react';


const useStyles = makeStyles((theme) => ({ 
    root: { 
        width: '100%',
        maxWidth: 360,
    },
    nonNavBar: {
        'height': '90vh',
        outline: '1px solid #d9b362'
    },
    test: { 
        'margin-top': 50
    }
}))


export default function TopDownInitial() { 
    const base : CareerListProps = {};
    const [careerList2, setCareerList] = useState<CareerListProps>(base);

    async function fetchData() { 
        try { 
            //Just need to change url to event-get-all-careers and tweak
                //CORS problem before, not sure if this is my fault?
            const {data} = await axios.get("https://ilur318q9c.execute-api.ap-southeast-2.amazonaws.com/Prod/getallmajors");
            let careerTitles2 : string[] = [];
            for(let i = 0 ; i < data.length; i++) { 
                careerTitles2[i] = data[i].MajorCode;
            }
            let resp : CareerListProps = { 
                careerList : careerTitles2,
            }
            setCareerList(resp);
        } catch(error) { 
            console.log(error)
        }
    }

    useEffect(() => { 
        fetchData();
    }, []);


    const classes = useStyles();
    return (
        <>
            <Navbar />
            <Grid container justify={'space-between'} alignItems={'stretch'} className={classes.nonNavBar}>
                <Grid item xs={2}>
                    <EmptyCurrentPlan />
                </Grid>

                <Grid item xs={8} className={classes.test}>
                    <TopDownInitialMain/>
                </Grid>

                <Grid item xs={2}>
                    <AvailableCareersList careerList={careerList2.careerList} />
                </Grid>
            </Grid>
        </>
    )
}