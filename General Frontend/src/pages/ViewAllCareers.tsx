// careers display with a search. Somehow this links to the course selection thingy
// don't call this yet it's not even close to done
import { BrowserRouter as Router } from "react-router-dom";
import { Box, Button, Grid, Typography, Card, CardHeader, TextField} from "@material-ui/core";
import Navbar from "../components/shared/Navbar";
import { useHistory } from 'react-router-dom';
import styled from "styled-components";
import { useMutation, useQueryClient } from "react-query";
import axios, { AxiosError, AxiosResponse } from "axios";
import {CareerProps} from "../types";

// called on loading of this component
// makes call to the careers API to get all careers so they can be rendered
function ListCareers(props: DefaultProps) {
    return (
        <>
          <Navbar/>
          <Container id="listcareers" className={props.careerTitle}>
	    <>
	      <Box id="searchcontainer" display="flex">
		<TextField variant="outlined" placeholder="Search careers..." className="searchbar" />
		<Button color="primary" variant='contained' className="searchbtn">GO</Button>
	      </Box>
	      <Box id="careers" marginTop={2}>
		<CareerProps careerTitle="idk" careerDescription="wagecuckery">
	      </Box>
	  </Container>
        </>
    );
}

export default styled(ListCareers)`
  #titlebar h4 {
    margin: auto;
  }
  #searchcontainer .searchbtn {
    margin-left: 15px;
  }
  #searchcontainer .searchbar {
    height: 36px;
    flex-grow: 1;
  }
  #searchcontainer .searchbar .MuiInputBase-root {
    height: 100%;
  }
`;
