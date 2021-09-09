import { Box, Button, Grid, Paper, Typography } from "@material-ui/core";
import TextSection from "./TextSection"
import NavListSection from "./NavListSection"
import { MajorProps, DefaultProps } from "../../types";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import axios, { AxiosResponse } from "axios";
import Error from "./Error";
import { useEffect, useState } from "react";
import LoadingScreen from "./Loading";

/*
 * Author: Matthew Loe
 * Student Id: 19452425
 * Date Last Modified: 7/09/2021
 * Description: Page for viewing the detailed information on a major
 */

function ViewMajor(props: DefaultProps)
{
  const history = useHistory();
  const id = history.location.state as string;  //Retrieve id for major information to get

  let base : MajorProps = {
    majorCode : id
  };

  const [isLoading, setLoading ] = useState(true);
  const [isError, setError ] = useState(false);
  const [error, setErrorContent] = useState<string>();
  const [major, setMajor] = useState<MajorProps>(base);
  
  //Asynchronously fetch data
  async function fetchData(id: string)
  {
    try
    {
      const {data} = await axios.get(
        'https://ilur318q9c.execute-api.ap-southeast-2.amazonaws.com/Prod/getmajor',//'${process.env.REACT_APP_UNITS_API}/getmajor',
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

      //Making uppercase the words in the name
      let name : string = data[0].Name;
      let parts : string[] = name.split(" ");

      for (let ii=0; ii < parts.length; ii++)
      {
        parts[ii] = parts[ii][0].toUpperCase() + parts[ii].substr(1);
      }
      //END FOR

      name = parts.join(" ");

      let resp : MajorProps = {
        majorCode : data[0].MajorCode,
        majorName : name,
        majorCredits : data[0].Credits,
        majorDescription : data[0].Description,
        majorUnits : data[0].Units,
        majorSpecAntiReqs : data[0].SpecAntiReqs,
        majorUnitAntiReqs : data[0].UnitAntiReqs
      };
      
      setMajor(resp);
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

  if (isError)
  {
    return <Error promptTitle="Request Error" promptContent={error as string} showPrompt={true} onAccept={() => BackFunction() } />
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
            <NavListSection sectionHeading="Antirequisite Specializations" list= {major.majorSpecAntiReqs}/>
            <NavListSection sectionHeading="Antirequisite Units" list= {major.majorUnitAntiReqs}/>
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
