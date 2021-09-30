/* eslint-disable @typescript-eslint/no-unused-vars */
import { ListSubheader, Typography, List } from '@material-ui/core';
import { MajorProps } from '../../types';
import { makeStyles } from '@material-ui/core/styles';
import { red } from '@material-ui/core/colors';
import IconButton from '@material-ui/core/IconButton';
import ClearIcon from '@material-ui/icons/Clear';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction'
import ListItemText from '@material-ui/core/ListItemText';

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
    },
}))


export default function CurrentPlan(props: MajorProps) { 


    //const major = useMajor(props.majorCode A: String);
    const classes = useStyles();

    const commonUnits = [ 
      "MEDI1000",
      "HUMB1000",
      "BIOL1004",
      "CHEM1007",
      "INDH1006",
      "EPID1000",
      "HUMB1001",
      "GENE1000" 
    ]

    if(props.majorUnits === undefined) { 
      return(<div/>)
    }
    function handleToggle() { 
        console.log('This would remove the entry from the list ?');
    }




    console.log("IN CURRENT PLAN") 
    console.log(props.majorUnits);


    return ( 
      <List subheader={<ListSubheader className={classes.listHeader}></ListSubheader>} className={classes.root}>
        <ListItem divider={true}>
          <ListItemText 
            primary={
              <Typography 
                variant='h6' 
                align='center'>
                  Current Plan
              </Typography>
            }>
          </ListItemText>
        </ListItem>
        <ListItem divider={true}>
          <ListItemText primary={`Main Major: ${props.majorName}`} />
        </ListItem>
        {commonUnits.map((value) => { 
          const labelId = `checkbox-list-label-${value}`;
          return ( 
            <ListItem divider={true} key={value} role={undefined} dense button>
              <ListItemText id={labelId} primary={`Common: ${value}`} />
              <ListItemSecondaryAction>
                <IconButton edge='end'>
                  <ClearIcon style={{ color: red[500] }} />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          )
        })}
        {props.majorUnits.map((value) => {
            const labelId = `checkbox-list-label-${value}`;
            return (
              <ListItem divider={true} key={value} role={undefined} dense button>
                <ListItemText id={labelId} primary={`Core: ${value}`} />
                <ListItemSecondaryAction>
                    <IconButton edge='end'>
                        <ClearIcon style={{ color: red[500] }} /> 
                    </IconButton> 
                </ListItemSecondaryAction>
              </ListItem>
            )
        })}
      </List>
    )
}