/* eslint-disable @typescript-eslint/no-unused-vars */
import { CardContent, CardActions, AppBar, Toolbar, Typography, Box, List, CardHeader, Avatar, Card, CardMedia } from '@material-ui/core';
import { DefaultProps } from '../../types';
import styled from 'styled-components';
import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { red } from '@material-ui/core/colors';
import IconButton from '@material-ui/core/IconButton';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';




const useStyles = makeStyles((theme) => ({ 
  root: { 
    maxWidth: 345,
  },
  media: {
    height: 0,
    paddingTop: '56.25%',
  },
  avatar: { 
    backgroundColor: red[900],
  },
}));

export default function Testing() { 
  const classes = useStyles();

  return ( 
    <Card className={classes.root}>
      <CardHeader
        avatar={
          <Avatar aria-label='recipe' className={classes.avatar}>
            A
          </Avatar>
        }
        action={
          <IconButton aria-label='settings'>
            <MoreVertIcon />
          </IconButton>
        }
        title="Career title"
        subheader=""
      />
      <CardMedia
        className={classes.media}
        image='getanimgbruv'
        title='imgbruv'
      />
      <CardContent>
        <Typography variant='body2' color='textSecondary' component='p'>
          This is a description of some career :D
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label='button1'>
          <FavoriteIcon />
        </IconButton>
        <IconButton aria-label='button2'>
          <ShareIcon />
        </IconButton>
      </CardActions>
      </Card>
  )
      }

