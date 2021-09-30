import { useEffect, useState } from 'react';
import { BrowserRouter as Router } from "react-router-dom";
import { Box, Button, Container,Grid, Typography, Card, CardHeader, CardContent, TextField} from "@material-ui/core";
import { useHistory } from "react-router-dom";
import { useQuery, useQueryClient } from "react-query";
import styled from "styled-components";
import axios, { AxiosError, AxiosResponse } from "axios";
import {BrowserRouter, Switch, Route} from "react-router-dom";

import Navbar from "../components/shared/Navbar";
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

function ViewAllCareers(props: DefaultProps) {
    const history = useHistory();
    const classes = useStyles();

    const base = [{Description : "", Industry : "", CareerId: ""}]
    const [careersList, setCareersData] = useState(base);

    const getCareersData = () => {
	axios.get("https://q02l9qoni6.execute-api.ap-southeast-2.amazonaws.com/Prod/events/event-get-all-careers")
	     .then((response) => {
		 setCareersData(response.data);
	     })
    }
    useEffect(() => {
	getCareersData();
    }, []);

    return (
	<>
	    <br>
		</br>
		<Container  >
		    <TextField style={{padding: '0 10px'}} variant="outlined" id="standard-full-width" fullWidth  placeholder="Search careers..." className="searchbar" />
		    <Button variant='contained' className="searchbtn">Search</Button>
			</Box>
			<br/>
			{careersList.map((x) => (
			    <div className="career-option">
				<Card variant="outlined" className={classes.root}>
				    <div className={classes.details}>
					<CardContent onClick={() => history.push(`/InfoPage/ViewCareer/${x.CareerId}`)} className={classes.content}>
					    <Typography className='values' component="h5" variant="h5" align="left">
						{x.Industry}
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

export default ViewAllCareers;
