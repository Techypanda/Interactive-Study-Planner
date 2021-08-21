// careers display with a search. Somehow this links to the course selection thingy
// don't call this yet it's not even close to done
import { BrowserRouter as Router } from "react-router-dom";
import { Box, Button, Container,Grid, Typography, Card, CardHeader, TextField} from "@material-ui/core";
import Navbar from "../components/shared/Navbar";
import { useHistory } from 'react-router-dom';
import styled from "styled-components";
import { useQuery, useQueryClient } from "react-query";
import axios, { AxiosError, AxiosResponse } from "axios";
import { CareerProps, DefaultProps } from "../types";

// called on loading of this component
// makes call to the careers API to get all careers so they can be rendered
function ListCareers(props: CareerProps) {
  const { isLoading, isError, error, data } = useQuery('getcareers', async () => {
    const data = await axios('${process.env.REACT_APP_CAREERS_API}/event-get-all-careers');
    return data;
  })
  if (isLoading) {
    return "Retrieving all careers";
  }
  if (isError) {
    return error;
  }
  return (
    <>
      <Navbar />
      <Container id="listcareers" className={props.careerTitle}>
        <Box id="searchcontainer" display="flex">
          <TextField variant="outlined" placeholder="Search careers..." className="searchbar" />
          <Button color="primary" variant='contained' className="searchbtn">GO</Button>
        </Box>
        <Box id="careers" marginTop={2}>
          {props}
        </Box>
      </Container>
    </>
  );
}

export default ListCareers;
