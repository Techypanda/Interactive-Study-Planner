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



const useStyles = makeStyles((theme) => ({ 
    root: { 
        width: '100%',
        maxWidth: 360,
    },
    test: { 
        'margin-top': 50
    }
}))


export default function TopDownInitialMain() { 
    const classes = useStyles();
    return (
        <>
            <Typography variant='h3' align='center'>
                Please Select A Career You Are Interested In
            </Typography>
            <Grid container justifyContent={'center'} className={classes.test}>
                <CareerUnitInfoCard/>
            </Grid>

        </>
    )
}