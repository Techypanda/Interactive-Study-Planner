import { Box, Button, Grid, Paper, Typography } from "@material-ui/core";
import TextSection from "./TextSection"
import NavListSection from "./NavListSection"
import { MajorProps, DefaultProps, ErrorProps, PromptData } from "../../types";
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
 * Description: Page for viewing the detailed information on a major
 */

function ViewMajor(props: DefaultProps)
{
  const history = useHistory();
  const id = history.location.state;  //Retrieve id for major information to get

  //Mock data
  const major : MajorProps = {
    majorCode : id as string,
    majorName: "haoghoehg",
    majorDescription : "ahfj",
    majorCredits: 200,
    majorUnits : ["ahgiod"],
    majorAntiReqs : ["ajghoaeh"],
  };
  

  //TODO - loading screen for when waiting
  axios.get('${process.env.REACT_APP_UNITS_API}/getmajor',
    { params:
      {
        code : id
      },
      headers:
      {
        'Content-Type': 'application/json'
      }
    }
  )
  .then( response => () => {
    //Parse response into major props
    major.majorName = response.data.Name;
    major.majorCredits = response.data.Credits;
    major.majorDescription = response.data.Description;
    major.majorUnits = response.data.Units;
    major.majorAntiReqs = response.data.SpecAntiReqs;
  })
  .catch( error => () => {
    //Return error
    console.log(error);
    return <Error promptTitle="Request Error" promptContent={error} showPrompt={true} onAccept={() => BackFunction() } />
  });

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
                {major.majorName} - {major.majorCode}
              </Typography>
            </Grid>
            <Grid item >
              {/*Empty grid item to make title more centre. */}
            </Grid>
          </Grid>
          <Box alignContent="flex-start" >
            <TextSection sectionHeading="Credits" sectionContent={major.majorCredits}/>
            <TextSection sectionHeading="Description" sectionContent= {major.majorDescription}/>
            <NavListSection sectionHeading="Units in Major" list= {major.majorUnits}/>
            <NavListSection sectionHeading="Antirequisite Specializations" list= {major.majorAntiReqs}/>
          </Box>
        </Paper>
      </div>
  );
}

export default styled(ViewMajor)`
.backButton {
  background-color: #FFBF00;
  margin: 14px;
}
.titleBar {
  justify-content: space-between;
  align-items: center;
}
`;
