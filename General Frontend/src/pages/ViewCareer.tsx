import {Box, Button, Typography} from "@material-ui/core";
import Navbar from "../components/shared/Navbar";
import TextSection from "../components/shared/TextSection"
import { CareerProps, DataIdProps } from "../types";
import { useHistory } from 'react-router-dom';
import styled from "styled-components";
import { useQuery, useQueryClient } from "react-query";
import axios, { AxiosError, AxiosResponse } from "axios";
import Error from "../components/shared/Error";

/*
 * Author: Matthew Loe
 * Student Id: 19452425
 * Date Last Modified: 22/08/2021
 * Description: Page for viewing the detailed information on a career
 */

//Returns user to their previous page
function BackFunction()
{

}

//Retrieves career information and returns in html
function ViewCareer(props: DataIdProps) {
  //Get career information from table
  const payload = {
    "CareerId" : props.id
  };

  //TODO - Check regarding CORS
  const { isLoading, isError, error, response} = useQuery('getCareer', async () => {
    const response = await axios({
      method: 'POST',
      url: '${process.env.CAREER_API}/event/event-getCareer',
      data: payload
    });
    
    return response;
  });

  //Check if loading
  if (isLoading)
  {
    return "Retrieving career information."; 
  }

  //Check if error
  if (isError)
  {
    return error; 
  }

  //Parse data
  const career : CareerProps = {
    careerName : "Test",
    careerDescription : "A rewarding career in medial research. asfdddddddddddddddddddddddddddddddddd dddddddddddddddddddddddddddddd ddddddddddddddddddddddddddddddd ddddddddd dddddddddddddddddasssssddddddddddgagasdgasgfsagsgasgddddddddddddddddddddddddddddddasssssddddddddddgagasdgasgfsagsgasgddddddddddddddddddddddddddddddddddddasssssddddddddddgagasdgasgfsagsgasgdddddddddddddddddddddddddddd",
    careerIndustry : "Medical research",
    careerReqs : "Some units",
    careerTraits : "Some traits"
  };

  return (
      <div>
        <Navbar/>
        <Typography id="careerTitle" variant="h2">
            {career.careerName}
        </Typography>
        <TextSection sectionHeading="Description" sectionContent= {career.careerDescription}/>

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
