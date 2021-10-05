//This is a redundant component - will make 'CurrentPlan' be a little more generic later
    //This only exists so I can quickly ensure intitial page works
        //Again, I will remove this later :)

/* eslint-disable @typescript-eslint/no-unused-vars */
import { ListSubheader, Typography, List } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';


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