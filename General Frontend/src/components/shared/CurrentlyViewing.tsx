/* eslint-disable @typescript-eslint/no-unused-vars */
import { Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import React from 'react';
import { createStyles, Theme } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
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
