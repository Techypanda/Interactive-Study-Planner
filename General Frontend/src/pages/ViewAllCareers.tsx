import { useState } from 'react';
import { BrowserRouter as Router } from "react-router-dom";
import { Box, Button, Container,Grid, Typography, Card, CardHeader, CardContent, TextField} from "@material-ui/core";
import { useHistory } from "react-router-dom";
import { useQuery, useQueryClient } from "react-query";
import styled from "styled-components";
import axios, { AxiosError, AxiosResponse } from "axios";

import Navbar from "../components/shared/Navbar";
import { CareerProps, DefaultProps } from "../types";
import { createStyles, makeStyles, Theme , useTheme} from '@material-ui/core/styles';
import "../App.scss";

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


// called on loading of this component
// makes call to the careers API to get all careers so they can be rendered
// props param is questionable atm but it's purpose is to take the form of the retrieved career
// data which will be available to retreive once the CORS is figured out 
function ViewAllCareers(props: DefaultProps) {
    const history = useHistory();
    const classes = useStyles();
    const theme = useTheme();

    // dummy data that mocks the actual data to be retrieved from the
    // api call commented out below
    let careers_list: { career_title: string, career_desc: string}[] = [
	{"career_title": "Pharmacologist", "career_desc": "Medicines and stuff"},
	{"career_title": "Anesthetician", "career_desc": "Give you a morphine problem"},
	{"career_title": "Surgeon", "career_desc": "Does surgery"}
    ];
    // with real dynamic data this would be:
    // const [career_title, career_desc] = useState([])

    /* // api call, perhaps simplify with just fetch()?
       const { isLoading, isError, error, data } = useQuery('getcareers', async () => {
       const data = await axios('${process.env.REACT_APP_CAREERS_API}/event-get-all-careers');
       return data;
       })
       if (isLoading) {
       return "Retrieving all careers";
       }
       if (isError) {
       return error;
       }*/

    // search bar filtering
    const [q, setq] = useState("");
    /* const [search_param] = useState("career_title", "career_desc"); */

    return (
	<>
	    <Navbar />
	    <br/>
	    <Container  >
		<Box id="searchcontainer" display="flex">
		    <TextField variant="outlined" id="standard-full-width" fullWidth  placeholder="Search careers..." className="searchbar" />
		    <Button  variant='contained' className="searchbtn">Search</Button>
		</Box>
		
		{careers_list.map((x) => (
		    <div className="career-option">
			<Card variant="outlined" className={classes.root}>
			    <div className={classes.details}>
				<CardContent className={classes.content}>
				    <Typography component="h5" variant="h5" align="left">
					{x.career_title}
				    </Typography>
				    <Typography variant="subtitle1" color="textSecondary">
					{x.career_desc}
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
