import { Box, Button, Grid, Paper, Typography } from "@material-ui/core";
import TextSection from "./TextSection"
import ListSection from "./ListSection"
import NavListSection from "./NavListSection"
import { CareerProps, DataIdProps, ErrorProps, PromptData } from "../../types";
import styled from "styled-components";
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
  const history = useHistory();
  const id = history.location.state;
  //Get career information from table
  const payload = {
    "CareerId" : id
  };

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
      <div className={props.className}>
        <Paper>
          <Grid className="titleBar" container direction="row">
            <Grid item>
              <Button className="backButton" variant="contained" onClick={() => BackFunction()} >
                Back
              </Button>
            </Grid>
            <Grid item>
              <Typography id="careerTitle" variant="h3">
                {career.careerName}
              </Typography>
            </Grid>
            <Grid item >
              {/*Empty grid item to make title more centre. */}
            </Grid>
          </Grid>
          <Box alignContent="flex-start" >
            <TextSection sectionHeading="Industry" sectionContent= {career.careerIndustry}/>
            <TextSection sectionHeading="Description" sectionContent= {career.careerDescription}/>
            <NavListSection sectionHeading="Suggested Career Requirements" list= {career.careerReqs}/>
            <ListSection sectionHeading="Compatible Traits" list= {career.careerTraits}/>
          </Box>
        </Paper>
      </div>
  );
}

export default styled(ViewCareer)`
.backButton {
  background-color: #FFBF00;
  margin: 14px;
}
.titleBar {
  justify-content: space-between;
  align-items: center;
}
`;
