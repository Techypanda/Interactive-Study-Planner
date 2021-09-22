/* eslint-disable @typescript-eslint/no-unused-vars */
import { CardContent , Grid, CardActions, ListSubheader, AppBar, Toolbar, Typography, Box, List, CardHeader, Avatar, Card, CardMedia, Switch, Checkbox } from '@material-ui/core';
import { DefaultProps } from '../../types';
import { borders, positions } from '@material-ui/system';
import styled from 'styled-components';
import { useState } from 'react';
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
import React from 'react';
import CareerUnitInfoCard from './CareerUnitInfoCard'
import TestCareerUnitInfoCard from './TestCareerUnitInfoCard';



const useStyles = makeStyles((theme) => ({ 
    root: { 
        outline: '1px solid #d9b362',
        width: '100%',
        maxWidth: 360,
    },
    test: { 
        'margin-top': 50,

    }
}))


    //DevCareer 1y22 i.e., left card requires:
        //ECEV3004, HUMB3009, BIOL3010, HUMB3003
    //Guessed best match is MJRU-HUMBM, requires:
        //BIOL3010, ECEV3004, HUMB2011, HUMB2012, HUMB2013, HUMB2014, HUMB3003, HUMB3009
    //Since closest match was MJRU-HUMBM
        //By selecting dev career 1y22, we are left with:
        //HUMB2012, HUMB2013, HUMB2014, HUMB3009
export default function TopDownInitialMain() { 
    const classes = useStyles();
    const history = useHistory();
    return (
        <>
            <Typography variant='h3' align='center'>
                Please Select A Career You Are Interested In
            </Typography>
            <Grid container justify={'center'} className={classes.test}>
                <TestCareerUnitInfoCard 
                    Code="1y2gwrzdtpg5d88ju3sauqognzm" 
                    Title="Analytical Chemist" 
                    Description="As an analytical chemist, you'll use a range of methods to 
                        investigate the chemical composition of substances." 
                />
                <TestCareerUnitInfoCard 
                    Code="1xvftd1oiymx333qspd7gclw7ro" 
                    Title="Biochemist" 
                    Description="Research the chemistry of living organisms to improve medicine,
                        veterinary science, agriculture, environmental science and manufacturing."
                />
                <TestCareerUnitInfoCard 
                    Code="1xvftatvovt1ezpickrerafcebl" 
                    Title="Dentist" 
                    Description="Diagnose and treat diseases, injuries , and abnormalities 
                        of teeth and gums, with preventive procedures, surgery, and other
                        specialist techniques."/> 
            </Grid>

        </>
    )
}