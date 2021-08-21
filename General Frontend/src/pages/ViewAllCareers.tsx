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
		    {/* somehow this search bar will dynamically filter the subsequent list
			I have no idea how to do that as of now since the data i.e. career name
			and description is totally hardcoded  */}
		    <TextField variant="outlined" id="standard-full-width" fullWidth  placeholder="Search careers..." className="searchbar" />
		    <Button  variant='contained' className="searchbtn">Search</Button>
		</Box>
		
		{/* dummy example of entry, will be filled dynamically on api call on startup*/}
		{/* Actual contents will be filled in a list of such Card items */}
		<Card className={classes.root}>
		    <div className={classes.details}>
			<CardContent className={classes.content}>
			    <Typography component="h5" variant="h5" align="left">
				Pharmacological Researcher
			    </Typography>
			    <Typography variant="subtitle1" color="textSecondary">
				With an intensive specialisation towards chemistry, this role will have you at the frontier of medicines.
			    </Typography>
			</CardContent>
			<div className={classes.controls}>
			</div>
		    </div>
		    <CardMedia
		    className={classes.cover}
		    image="/static/images/cards/live-from-space.jpg"
		    title="Live from space album cover"
		    />
		</Card>
	    </Container>
	    <br/>
	    <Button variant="contained" onClick={() => history.goBack()}>Back</Button>
	</>
    );
}

export default ViewAllCareers;
