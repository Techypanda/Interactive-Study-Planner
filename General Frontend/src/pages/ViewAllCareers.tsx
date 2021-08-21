// careers display with a search. Somehow this links to the course selection thingy
// don't call this yet it's not even close to done
import { BrowserRouter as Router } from "react-router-dom";
import { Box, Button, Container,Grid, Typography, Card, CardHeader, TextField} from "@material-ui/core";
import Navbar from "../components/shared/Navbar";
import styled from "styled-components";
import {useHistory} from "react-router-dom";
import { useQuery, useQueryClient } from "react-query";
import axios, { AxiosError, AxiosResponse } from "axios";
import { CareerProps, DefaultProps } from "../types";
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

// called on loading of this component
// makes call to the careers API to get all careers so they can be rendered
// props param is questionable atm but it's purpose is to take the form of the retrieved career
// data which will be available to retreive once the CORS is figured out 
function ViewAllCareers(props: DefaultProps) {
    let history = useHistory();
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
		<Box id="careers" marginTop={2}>
		    
		</Box>
	    </Container>
		<Button variant="contained" onClick={() => history.goBack()}>Back</Button>
	</>
    );
}

export default ViewAllCareers;
