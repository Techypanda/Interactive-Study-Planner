import { useEffect, useState } from 'react';
import { BrowserRouter as Router } from "react-router-dom";
import { Box, Button, Container,Grid, Typography, Card, CardHeader, CardContent, TextField} from "@material-ui/core";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import axios, { AxiosError, AxiosResponse } from "axios";
import {BrowserRouter, Switch, Route} from "react-router-dom";

import { CareerProps, DefaultProps } from "../types";
import { createStyles, makeStyles, Theme , useTheme} from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
	root: {
	    display: 'flex',
	},
	details: {
	    display: 'flex',
	    flexDirection: 'column',
	},
	content: {
	    flex: '1 0 auto',
	},
	cover: {
	    width: 151,
	},
	controls: {
	    display: 'flex',
	    alignItems: 'right',
	    paddingRight: theme.spacing(1),
	    paddingBottom: theme.spacing(1),
	},
	playIcon: {
	    height: 38,
	    width: 38,
	},
	
    }),
);

function ViewAllUnits(props: DefaultProps) {
    const history = useHistory();
    const classes = useStyles();

    const base = [{Credits: "", Antirequisites: "", Prerequisites: "", Delivery: "", UnitCode: "", Description: "", Corequisites: "", Name: ""}];
    const [units_list, set_units_list] = useState(base);

    const GetAllUnits = () => {
	axios.get("https://ilur318q9c.execute-api.ap-southeast-2.amazonaws.com/Prod/getallunits/")
	.then((response) => {
	    console.log(response.data);
	    set_units_list(response.data);
	});
    }
    useEffect(() => {
	GetAllUnits();
    }, []);

    return (
	<>
	    <Container  >
		<Box id="searchcontainer" display="flex">
		    <TextField variant="outlined" id="standard-full-width" fullWidth  placeholder="Search units..." className="searchbar" />
		    <Button variant='contained' className="searchbtn">Search</Button>
		</Box>
		<br/>
		{units_list.map((x) => (
		    <div className="card-body">
			<Card variant="outlined" className={classes.root}>
			    <div className={classes.details}>
				<CardContent className={classes.content}>
				    <Typography component="h5" variant="h5" align="left">
					{x.Name}
				    </Typography>
				    <Typography variant="subtitle1" color="textSecondary">
					{x.Description}
				    </Typography>
				</CardContent>
				<div className={classes.controls}>
				</div>
			    </div>
			</Card>
		    </div>
		    ))}
	    </Container>
	    <br/>
	    <Button variant="contained" onClick={() => history.goBack()}>Back</Button>
	</>
    );
}

export default ViewAllUnits;
