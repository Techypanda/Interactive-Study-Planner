import { Box, Button, Grid, Paper, Typography } from "@material-ui/core";
import TextSection from "./TextSection"
import NavListSection from "./NavListSection"
import { MajorProps, DefaultProps, ErrorProps, PromptData } from "../../types";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import axios, { AxiosError, AxiosResponse } from "axios";
import Error from "./Error";
import { useEffect, useState } from "react";
import LoadingScreen from "./Loading";

/*
 * Author: Matthew Loe
 * Student Id: 19452425
 * Date Last Modified: 27/08/2021
 * Description: Page for viewing the detailed information on a major
 */

function ViewMajor(props: DefaultProps)
{
  const history = useHistory();
  const id = history.location.state as string;  //Retrieve id for major information to get

  //Mock data
  let mock : MajorProps = {
    majorCode : id
  };

  const [isLoading, setLoading ] = useState(true);
  const [isError, setError ] = useState(false);
  const [error, setErrorContent] = useState();
  const [major, setMajor] = useState<MajorProps>(mock);
  
  //Asynchronously fetch data
  async function fetchData(id: string)
  {
    try
    {
      const {data} = await axios.get(
        'https://c7u1a16o0f.execute-api.ap-southeast-2.amazonaws.com/Prod/getmajor',//'${process.env.REACT_APP_UNITS_API}/getmajor',
          { params:
            {
              code : id
            },
            headers:
            {
              'Content-Type': 'application/json'
            }
          }
      );

      let resp : MajorProps = {
        majorCode : data[0].MajorCode,
        majorName : data[0].Name,
        majorCredits : data[0].Credits,
        majorDescription : data[0].Description,
        majorUnits : data[0].Units,
        majorAntiReqs : data[0].SpecAntiReqs
      };
      
      setMajor(resp);
      setLoading(false);
    }
    catch(err)
    {
      if (axios.isAxiosError(err))
      {
        //Handle axios err
      }
      else
      {
        //Handle non axios error
      }
      console.error(err);
    }
    //END TRY-CATCH
  }

  //Get data and then refresh
  useEffect(() => {
    fetchData(id);
  }, []);

  //Returns user to their previous page
  function BackFunction()
  {
    history.goBack();
  }

  //Check if still loading/getting data
  if (isLoading)
  {
    return (<LoadingScreen/>);
  }
  //END IF

  //if (isError)
  //{
    //return <Error promptTitle="Request Error" promptContent={error} showPrompt={true} onAccept={() => BackFunction() } />
    //console.log(error);
    
  //}
  //END IF

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
