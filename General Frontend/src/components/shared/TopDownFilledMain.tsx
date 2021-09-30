/* eslint-disable @typescript-eslint/no-unused-vars */
import { Button , Grid, Typography } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
//import CareerUnitInfoCard from './CareerUnitInfoCard'
import React from 'react';
import { createStyles, Theme } from '@material-ui/core/styles';
import CurrentlyViewing from './CurrentlyViewing';
import PlansAvailable from './PlansAvailable';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        formControl: {
            margin: theme.spacing(1),
            minWidth: 120,
        },
        selectEmpty: {
            marginTop: theme.spacing(2),
        },
        centerText: { 
            textAlign: 'center',
            maxWidth: '70vw',
            marginTop: 70
        }, 
        buttons: { 
            marginTop: 40,
        },
        test: { 
            backgroundColor: '#ffbf00',
            margin: '1vw'
        }
    }),
    )

export default function TopDownFilledMain() { 
    const classes = useStyles()
    const [title, setTitle] = React.useState(0);
    const history = useHistory();

    const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
        setTitle(event.target.value as number)
    }

    function returnToMenu() { 
        history.push('./');
    }

    return ( 
        <>
        <Grid container justify={'space-between'}>
            <Grid item xs={5}>
                <CurrentlyViewing />
            </Grid>
            <Grid item xs={5}>
                <PlansAvailable />
            </Grid>
        </Grid>
            <div className={classes.centerText}>
                <Typography className={classes.centerText} variant='h4'>
                    Your Plan is Now Full
                </Typography>
                <Typography className={classes.centerText} variant='h5'>
                    You can view possible career paths on the right list, if you 
                    want more information you can click on the career to open a career 
                    information view. You can also click continue to move onto planning your
                    study plan
                </Typography>
                <div className={classes.buttons}>
                    <Button variant='contained' className={classes.test} onClick={() => returnToMenu()}>Return To Main Menu</Button>
                    <Button variant='contained' className={classes.test} onClick={() => returnToMenu()}>Continue To Study Plan</Button>
                    {/*For now, continuing to study plan will just return to front page, can be easily tweaked later */}
                </div>
            </div>
        </>
    )
}