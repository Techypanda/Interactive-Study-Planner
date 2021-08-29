import { Box, Button, Fade, Grid, Paper, Typography } from "@material-ui/core";
import TextSection from "./TextSection"
import ListSection from "./ListSection"
import NavListSection from "./NavListSection"
import { CareerProps, DefaultProps } from "../../types";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import axios, { AxiosResponse } from "axios";
import Error from "./Error";
import { useEffect, useState } from "react";
import LoadingScreen from "./Loading";

/*
 * Author: Matthew Loe
 * Student Id: 19452425
 * Date Last Modified: 29/08/2021
 * Description: Page for viewing the detailed information on a career
 */

//Retrieves career information and returns in html
function ViewCareer(props: DefaultProps)
{
  const history = useHistory();
  const id = history.location.state as string; //Get target career id

  //Get career information from table
  const payload = {
    "CareerId" : id
  };

  const headers =
  {
    'Content-Type': 'application/json'
  }

  const base : CareerProps = {};

  const [isLoading, setLoading ] = useState(true);
  const [isError, setError ] = useState(false);
  const [error, setErrorContent] = useState<string>();
  const [career, setCareer] = useState<CareerProps>(base);

  //Asynchronously fetch data
  async function fetchData(id: string)
  {
    try
    {
      const {data} = await axios.post(
        'https://uiqb5tsrsc.execute-api.ap-southeast-2.amazonaws.com/Prod/events/event-get-career',//'${process.env.REACT_APP_CAREERS_API}/getmajor',
        payload,
        {
           headers 
        }
      );

      let resp : CareerProps = {
        careerName : data[0].CareerName,
        careerDescription : data[0].Description,
        careerIndustry : data[0].Industry,
        careerReqs : data[0].Requirements,
        careerTraits : data[0].Traits
      };
      
      setCareer(resp);
      setLoading(false);
    }
    catch(err)
    {
      if (err && err.response && axios.isAxiosError(err))
      {
        //Handle axios err
        const axiosResp = err.response as AxiosResponse;
        setErrorContent(axiosResp.data);
        setError(true);
        setLoading(false);
      }
      else
      {
        //Handle non axios error
        setErrorContent("Unknown error occured during data retrieval.");
        setError(true);
        setLoading(false);
      }
      //END IF
    }
    //END TRY-CATCH
  }

  //Returns user to their previous page
  function BackFunction()
  {
    history.goBack();
  }

  //Get data and then refresh
  useEffect(() => {
    fetchData(id);
  }, []);

  //Check if still loading/getting data
  if (isLoading)
  {
    return (<LoadingScreen/>);
  }
  //END IF

  if (isError)
  {
    return <Error promptTitle="Request Error" promptContent={error as string} showPrompt={true} onAccept={() => BackFunction() } />
  }
  //END IF

  //Check for no name
  if (career.careerName === undefined)
  {
    career.careerName = "No career name";
  }
  //END IF

  return (
      <div className={props.className}>
        <Fade in={true} timeout={2000}>
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
        </Fade>
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
