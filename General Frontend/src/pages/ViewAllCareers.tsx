// careers display with a search. Somehow this links to the course selection thingy
// don't call this yet it's not even close to done
import { BrowserRouter as Router } from "react-router-dom";
import { Box, Button, Container,Grid, Typography, Card, CardHeader, CardContent, CardMedia, TextField} from "@material-ui/core";
import Navbar from "../components/shared/Navbar";
import styled from "styled-components";
import {useHistory} from "react-router-dom";
import { useQuery, useQueryClient } from "react-query";
import axios, { AxiosError, AxiosResponse } from "axios";
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

    /*
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
    return (
	<>
	    <Navbar />
	    <br/>
	    <Container  >
		<Box id="searchcontainer" display="flex">
		    
		    <TextField variant="outlined" id="standard-full-width" fullWidth  placeholder="Search careers..." className="searchbar" />
		    <Button  variant='contained' className="searchbtn">Search</Button>
		</Box>
		
		{/* dummy example of entry, will be filled dynamically on api call on startup*/}
		{/* Actual contents will be filled in a list of such Card items */}
		{careers_list.map((x) => (
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
		))}
	    </Container>
	    <br/>
	    
	    <Button variant="contained" onClick={() => history.goBack()}>Back</Button>
	</>
    );
}

export default ViewAllCareers;
