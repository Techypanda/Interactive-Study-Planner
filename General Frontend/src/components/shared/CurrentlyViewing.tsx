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
import { createStyles, Theme } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';


const useStyles = makeStyles((theme: Theme) => 
    createStyles({
        formControl: {
            margin: theme.spacing(1),
            minWidth: 120,
        },
        selectEmpty: {
            marginTop: theme.spacing(2),
        },
    })
)

export default function CurrentlyViewing() {
    const classes = useStyles()
    const [currentlyViewing, setCurrentlyViewing] = React.useState(0);

    const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => { 
        setCurrentlyViewing(event.target.value as number)
    }
    return ( 
        <>
            <Typography variant='h5'>
                Currently Viewing
            </Typography>
            <FormControl className={classes.formControl}>
                <Select
                    value={currentlyViewing}
                    onChange={handleChange}
                >
                    <MenuItem value={0}>Majors</MenuItem>
                    <MenuItem value={1}>Careers</MenuItem>
                </Select>
            </FormControl>
        </>
    )
}
