//This is a redundant component - will make 'CurrentPlan' be a little more generic later
    //This only exists so I can quickly ensure intitial page works
        //Again, I will remove this later :)

/* eslint-disable @typescript-eslint/no-unused-vars */
import { CardContent, CardActions, ListSubheader, AppBar, Toolbar, Typography, Box, List, CardHeader, Avatar, Card, CardMedia, Switch } from '@material-ui/core';
import { DefaultProps, MajorProps } from '../../types';
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
import { isClassExpression } from 'typescript';
import axios from 'axios';
import { MajorUnitListProps } from '../../types';


const useStyles = makeStyles((theme) => ({
    root: { 
        width:'100%',
        maxWidth: 360,
        backgroundColor: theme.palette.background.paper,
        outline: '1px solid #d9b362',
        height: '100%'
    },
    listHeader: {
      //'text-align': 'center',
      color: 'black',
    }
}))


export default function EmptyCurrentPlan() { 
    const classes = useStyles();

    function handleToggle() { 
        console.log('This would remove the entry from the list ?');
    }


    const testCareerJson = [
      {
        "Requirements": [
          "CMHL1000",
          "HUMB1000"
        ],
        "Traits": [
          "critical thinker",
          "hardworking"
        ],
        "Name": "Pharmacology",
      },
    ];
    /*const testMajorJson = [
      {
        "majorCode": "CACA1000",
        "majorName": "Pharmacology",
        "majorDescription": "yeah yeah hey yeah a ha aaaa",
        "majorCredits": 25,
        "majorUnits": [
          "BIOL3010",
          "ECEV3004",
          "HUMB2011",
          "HUMB2012",
          "HUMB2014",
          "HUMB3003",
          "HUMB3009"
        ]
      }
    ]*/

    return ( 
      <List subheader={<ListSubheader className={classes.listHeader}>
          <Typography variant='h6' align='center'>
              Current Plan
           </Typography>
           </ListSubheader>} className={classes.root}>
      </List>
    )
}