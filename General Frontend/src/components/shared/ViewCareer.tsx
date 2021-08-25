import { Box, Button, Paper, Typography } from "@material-ui/core";
import TextSection from "./TextSection"
import ListSection from "./ListSection"
import NavListSection from "./NavListSection"
import { CareerProps, DataIdProps, ErrorProps, PromptData } from "../../types";
import styled from "styled-components";
import { useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import { useHistory } from "react-router-dom";
import axios, { AxiosError, AxiosResponse } from "axios";
import Error from "./Error";
import { BounceLoader } from "react-spinners";


/*
 * Author: Matthew Loe
 * Student Id: 19452425
 * Date Last Modified: 25/08/2021
 * Description: Page for viewing the detailed information on a career
 */

//Retrieves career information and returns in html
function ViewCareer(props: DataIdProps) {
  //Get career information from table
  const payload = {
    "CareerId" : props.id
  };

  const history = useHistory();
  const [error, setError] = useState<PromptData>({ promptTitle: "", promptContent: "", showPrompt: false });
  const [loading, setLoading] = useState(false);

  //TODO - Check regarding CORS
  axios({
    method: 'POST',
    url: 'https://uiqb5tsrsc.execute-api.ap-southeast-2.amazonaws.com/Prod/events/event-get-career',//'${process.env.CAREER_API}/events/event-get-career',
    data: JSON.stringify(payload)
  })
  .then( response => () => {
    //Parse response into career props
  })
  .catch( error => () => {
    //Return error
    console.log(error);
    return <Error promptTitle="Request Error" promptContent={error} showPrompt={true} onAccept={() => BackFunction() } />
  });

  //Mock data
  const career : CareerProps = {
    careerName : "Test",
    careerDescription : "A rewarding career in medial research. asfdddddddddddddddddddddddddddddddddd dddddddddddddddddddddddddddddd ddddddddddddddddddddddddddddddd ddddddddd dddddddddddddddddasssssddddddddddgagasdgasgfsagsgasgddddddddddddddddddddddddddddddasssssddddddddddgagasdgasgfsagsgasgddddddddddddddddddddddddddddddddddddasssssddddddddddgagasdgasgfsagsgasgdddddddddddddddddddddddddddd",
    careerIndustry : "Medical research",
    careerReqs : ["Some units", "Some units", "Some units" ],
    careerTraits : [ "Some units", "Some units", "Some units" ],
  };

  //Returns user to their previous page
  function BackFunction()
  {
    history.goBack();
  }

  return (
      <div>
        <Paper>
          <Typography id="careerTitle" variant="h3">
              {career.careerName}
          </Typography>
          <Box alignContent="flex-start" >
            <TextSection sectionHeading="Industry" sectionContent= {career.careerIndustry}/>
            <TextSection sectionHeading="Description" sectionContent= {career.careerDescription}/>
            <NavListSection sectionHeading="Suggested Career Requirements" list= {career.careerReqs}/>
            <ListSection sectionHeading="Compatible Traits" list= {career.careerTraits}/>
          </Box>
        </Paper>
        <Button variant="contained" onClick={ () => BackFunction() } style={{
            backgroundColor: "#FFBF00",
            margin: "12px",
          }}>
          Back
        </Button>
      </div>
  );
}

export default styled(ViewCareer)`
`;
