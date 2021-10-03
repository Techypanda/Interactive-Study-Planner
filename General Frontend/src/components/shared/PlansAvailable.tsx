/* eslint-disable @typescript-eslint/no-unused-vars */
import { Typography, List } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

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