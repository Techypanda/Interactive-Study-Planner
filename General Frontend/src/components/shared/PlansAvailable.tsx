/* eslint-disable @typescript-eslint/no-unused-vars */
import { CardContent, CardActions, ListSubheader, AppBar, Toolbar, Typography, Box, List, CardHeader, Avatar, Card, CardMedia, Switch, Checkbox } from '@material-ui/core';
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

const useStyles = makeStyles((theme) => ({ 
    root: {
        marginTop: '5px',
        backgroundColor: theme.palette.background.paper,
    },
    listItems: {
        height: '2.5vh',
        margin: '5px 0',
        outline: '1px solid #d9b362',
    },
    listItemsText: {
        'fontSize': '0.8em'
    }
}))

export default function PlansAvailable() {
    const classes = useStyles()

    return (
        <>
            <Typography variant='h5'>
                What Plans Are Available?
            </Typography>
            <Typography variant='h6'>
                At Curtin Medical we support the following type of plans
            </Typography>
            <List className={classes.root}>
                <ListItem className={classes.listItems}>
                    <ListItemText disableTypography primary={'DOUBLE MAJOR'} className={classes.listItemsText}/>
                </ListItem>
                <ListItem className={classes.listItems}>
                    <ListItemText disableTypography primary={'MAIN MAJOR \
                         + 2 INTERNAL SPECIALIZATIONS'} className={classes.listItemsText}/>
                </ListItem>
                <ListItem className={classes.listItems}>
                    <ListItemText disableTypography primary={'MAIN MAJOR  \
                        + 1 INTERNAL SPECIALIZATION  \
                        + 1 EXTERNAL SPECIALIZATION'} className={classes.listItemsText}/>
                </ListItem>
                <ListItem className={classes.listItems}>
                    <ListItemText disableTypography primary={'MAIN MAJOR \
                        + 1 INTERNAL SPECIALIZATION \
                        + 4 OPTIONAL UNITS'} className={classes.listItemsText}/>
                </ListItem>
            </List>

        </>
    )
}