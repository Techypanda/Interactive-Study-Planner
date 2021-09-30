//Delete this later
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Typography, Card, CardActions, CardHeader, CardMedia, CardContent} from "@material-ui/core";
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { makeStyles } from '@material-ui/core/styles';
import Button from "@material-ui/core/Button";
import { useHistory } from "react-router-dom";

import { red } from '@material-ui/core/colors'

import { InfoCardProps } from "../../types";


const useStyles = makeStyles((theme) => ({ 
  root: {
    width: '100%',
    maxWidth: 260,
    height: '50vh',
    display: 'flex',
    'flex-direction': 'column',
    'justify-content': 'space-between',
  },
  media: { 
    height: 0,
    paddingTop: '40%', //Adjust this line to increase how much space the image takes up
  },
  avatar: {
    backgroundColor: red[500],
  },
  text: {
    textTransform: "none",
    display: 'flex',
    'flex-direction': 'column',
    'justify-content': 'space-between'
  }
}))
//All credit for design goes to https://material-ui.com/components/cards/ 
//This card is very slightly modified from the sampel cards on the link above
export default function TestCareerUnitInfoCard(props: InfoCardProps) { 
  const classes = useStyles();
  const history = useHistory();

  function loadTopDownFilled() { 
      //console.log(props.Code);
      history.push('./TopdownFilled', props.Code);
  }
  function loadCareerInfoPage() { 
      //For now I will just redirect to the career info page
        //Once whoever is responsible for the individual info pages finishes, I will simply redirect to that
      history.push('./ViewAllCareers');
      
  }
  return (
    <>
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
            title={`${props.Title}`}
            />
          <CardMedia
            className={classes.media}
            image='./some/image/here'
            title='some description here'
          />
          <CardContent>
            <Typography variant='body2' color='textSecondary' component='p'>
                {`${props.Description}`}
            </Typography>
          </CardContent>
          <CardActions >
            <Button 
              onClick={() => { 
                loadTopDownFilled();
              }}
              variant="text" 
              className={classes.text}
              >Select Career
            </Button>
            <Button 
              onClick={() => { 
                loadCareerInfoPage();
              }}
              variant="text" 
              className={classes.text}
              >More Info
            </Button>
          </CardActions>
        </Card>
    </>
  )}