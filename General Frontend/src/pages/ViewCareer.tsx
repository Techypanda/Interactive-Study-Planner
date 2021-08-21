import {Box, Button, Typography} from "@material-ui/core";
import Navbar from "../components/shared/Navbar";
import { CareerProps, DataIdProps } from "../types";
import { useHistory } from 'react-router-dom';
import styled from "styled-components";
import { useQuery, useQueryClient } from "react-query";
import axios, { AxiosError, AxiosResponse } from "axios";
import Error from "../components/shared/Error";

// most likey used for top down, so user looks at careers, picks one (where though?) and a pre-planned plan is generated.
// Pretty much just a white page with a title, paragraphs and a back button, could really be
// with raw HTML tbh
function ViewCareer(props: DataIdProps) {
  //Get career information from table
  const payload = {
    "CareerId" : props.id
  };

  //TODO - Check regarding CORS
  axios.post(`${process.env.REACT_APP_CAREER_API_URI}/event/event-get-career`, JSON.stringify(payload), {
    headers: {
      'Content-Type': 'application/json'
    }
  })
  .then(response => {
    console.log(response.data);
    //Parse data
    let career = JSON.parse(response.data);
  })
  .catch(error => {
    //Return error page
    if (error.response)   //Response received
    {
      
    }
    else if (error.request) //Request made but no response
    {
      
    }
    else    //Unknown other error
    {

    }
    //END IF
  });  

  const career : CareerProps = {
    careerName : "Test",
    careerDescription : "A rewarding career in medial research. asfdddddddddddddddddddddddddddddddddd dddddddddddddddddddddddddddddd ddddddddddddddddddddddddddddddd ddddddddd dddddddddddddddddasssssddddddddddgagasdgasgfsagsgasgddddddddddddddddddddddddddddddasssssddddddddddgagasdgasgfsagsgasgddddddddddddddddddddddddddddddddddddasssssddddddddddgagasdgasgfsagsgasgdddddddddddddddddddddddddddd",
    careerIndustry : "Medical research",
    careerReqs : "Some units",
    careerTraits : "Some traits"
  };

  //TODO-Look into styling
  return (
      <div>
        <Navbar/>
        <Typography id="careerTitle" variant="h2">
            {career.careerName}
        </Typography>
        <Typography className="careerHeadings" align="left" variant="h4">Description</Typography>

        <Box width={1}>
          <Typography className="textClass" variant="h6" align="left" style={{ wordWrap: "break-word" }}>
            {career.careerDescription}
          </Typography>
        </Box>
        
      
        <Typography className="careerHeadings" variant="h4">Industry</Typography>
        <Typography className="textClass" variant="h6">
          {career.careerDescription}
        </Typography>
        
        <Typography className="careerHeadings" variant="h4">Requirements</Typography>
        <Typography className="textClass" variant="h6">
          {career.careerDescription}
        </Typography>
        <Typography className="careerHeadings" variant="h4">Traits</Typography>
        <Typography className="textClass" variant="h6">
          {career.careerDescription}
        </Typography>
        <Button variant="contained" style={{
            backgroundColor: "#FFBF00",
        }}>
          Back
        </Button>
      </div>
  );
}

export default ViewCareer;
