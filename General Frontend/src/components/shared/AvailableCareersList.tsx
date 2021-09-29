/* eslint-disable @typescript-eslint/no-unused-vars */
import { CardContent, CardActions, ListSubheader, AppBar, Toolbar, Typography, Box, List, CardHeader, Avatar, Card, CardMedia, Switch, Checkbox } from '@material-ui/core';
import { CareerListProps, DefaultProps } from '../../types';
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
        width: '100%',
        backgroundColor: theme.palette.background.paper,
        outline: '1px solid #d9b362',
        height: '100%'
    }
}))


export default function AvailableCareersList(props: any) { 
    const history = useHistory();
    const classes = useStyles();
    let careerObj = props.careerObj || [];

    function goToCareerInfoPage(value:any) { 
        history.push(`./InfoPage/ViewCareer/${value.CareerId}`);
    }

    return ( 
        <List className={classes.root}>
            {careerObj.map((value: any) => {
                const labelId = `checkbox-list-label-${value}`;
                return (
                    <ListItem key={value} role={undefined} dense button onClick={() => goToCareerInfoPage(value)}>
                        <ListItemText id={labelId} primary={`${value.Name}`} />
                        <ListItemSecondaryAction>
                            <IconButton edge='end' aria-label='comments'>
                                <BookOutlined />
                            </IconButton>
                        </ListItemSecondaryAction>
                    </ListItem>
                )
            })}
        </List>
        )

}