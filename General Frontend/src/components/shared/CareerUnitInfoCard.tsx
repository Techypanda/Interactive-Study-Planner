/* eslint-disable @typescript-eslint/no-unused-vars */
import { AppBar, Toolbar, Typography, Box, List, Card, Grid, CardActions, CardActionArea, CardHeader, CardMedia, CardContent, Paper} from "@material-ui/core";
import Avatar from '@material-ui/core/Avatar';
import PropTypes from 'prop-types';
import { DefaultProps } from "../../types";
import CareersImage from '../../../src/static/career.jpg';
import settingImage from  '../../../src/sttatic/settings.jpg';
import styled from 'styled-components';
import IconButton from '@material-ui/core/IconButton';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import AppsIcon from '@material-ui/icons/Apps';
import clsx from 'clsx';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import CheckIcon from '@material-ui/icons/Check'
import CloseIcon from '@material-ui/icons/Close'
import Button from "@material-ui/core/Button";
import { useHistory, Switch, Route } from "react-router-dom";

import { red } from '@material-ui/core/colors'

import { useState } from 'react';
import { classes } from "istanbul-lib-coverage";

const useStyles = makeStyles((theme) => ({ 
  root: {
    width: '100%',
    maxWidth: 260,
  },
  media: { 
    height: 0,
    paddingTop: '35%', //Adjust this line to increase how much space the image takes up
  },
  avatar: {
    backgroundColor: red[500],
  },
  text: {
    textTransform: "none"
  }
}))
//All credit for design goes to https://material-ui.com/components/cards/ 
//This card is very slightly modified from the sampel cards on the link above
export default function StyledComponents() { 
  const classes = useStyles();
  const history = useHistory();



  function selectedCareer() { 
    history.push("/Landing");
  }
  const testCareerJson = [
    {
      "Name": "Medical Research",
      "Description": "Research and publish new and revolutionary concepts",
    },
    {
      "Name": "Pharmacy",
      "Description": "Develop new pharmaceuticals and improve peoples lives"
    },
    {
      "Name": "Chemistry",
      "Description": "A very descriptive explanation about chemistry"
    }
  ];
  
  return (
    <>
      {testCareerJson.map((value) => {
      return (
        <Card className={classes.root}>
          <CardHeader 
            avatar={
              <Avatar aria-label='recipe' className={classes.avatar}>
                M
              </Avatar>
            }
            action={
              <IconButton>
                <MoreVertIcon />
              </IconButton>
            }
            title={`${value.Name}`}
            />
          <CardMedia
            className={classes.media}
            image='./some/image/here'
            title='some description here'
          />
          <CardContent>
            <Typography variant='body2' color='textSecondary' component='p'>
              {`${value.Description}`}
            </Typography>
          </CardContent>
          <CardActions disableSpacing>
            <Button 
              onClick={() => { 
                selectedCareer();
              }}
              variant="text" 
              className={classes.text}
              >Select Career
            </Button>
            <Button 
              onClick={() => { alert('This would direct you to an info page')}}
              variant="text" 
              className={classes.text}
              >More Info
            </Button>
          </CardActions>
        </Card>
      )
     })
}
  </>

  /*return (
    <Card className={classes.root}>
      <CardHeader 
        avatar={
          <Avatar aria-label='recipe' className={classes.avatar}>
            M  {/*This is placeholder, need to swap this for some other symbol idk what jony used */
          /*</Avatar>
        }
        action={
          <IconButton aria-label='idk what this does'>
            <MoreVertIcon />
          </IconButton>
        }
        title='career header 1'
        subheader='career subheader 1'
        />
        <CardMedia
          className={classes.media}
          image='./some/image/here'
          title='title goes here'
        />
        <CardContent>
          <Typography variant='body2' color='textSecondary' component='p'>
            A career description goes here I think
          </Typography>
        </CardContent>
        <CardActions disableSpacing>
          <IconButton aria-label='add to faves'>
            <CheckIcon />
          </IconButton>
          <IconButton aria-label='share'>
            <CloseIcon />
          </IconButton>
        </CardActions>
    </Card>
  )*/
  )}
