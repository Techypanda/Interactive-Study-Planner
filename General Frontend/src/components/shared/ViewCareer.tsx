import { Box, Button, Grid, Paper, Typography } from "@material-ui/core";
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
 * Date Last Modified: 31/08/2021
 * Description: Page for viewing the detailed information on a career
 */

//Retrieves career information and returns in html
function ViewCareer(props: DefaultProps)
{
  const history = useHistory();
  const id = history.location.state as string; //Get target career id

  //Get career information from table
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
        'https://q02l9qoni6.execute-api.ap-southeast-2.amazonaws.com/Prod/events/event-get-career',//'${process.env.REACT_APP_CAREERS_API}/event-get-career',
        {
          'CareerId': id
        }
      );

      let info = data["Item"];

      //Making uppercase the words in the name
      let name : string = info["Name"];
      let parts : string[] = name.split(" ");

      for (let ii=0; ii < parts.length; ii++)
      {
        parts[ii] = parts[ii][0].toUpperCase() + parts[ii].substr(1);
      }
      //END FOR

      name = parts.join(" ");

      let traits : string[] = info["Traits"];

      for (let ii=0; ii < traits.length; ii++)
      {
        traits[ii] = traits[ii][0].toUpperCase() + traits[ii].substr(1);
      }
      //END FOR

      let resp : CareerProps = {
        careerName : name,
        careerDescription : info["Description"],
        careerIndustry : info["Industry"],
        careerReqs : info["Requirements"],
        careerTraits : traits
      };
      
      setCareer(resp);
      setLoading(false);
    }
    catch(err)
    {
      if (err && axios.isAxiosError(err))
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
