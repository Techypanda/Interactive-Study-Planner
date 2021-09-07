import { Box, Button, Grid, Paper, Typography } from "@material-ui/core";
import TextSection from "./TextSection"
import NavListSection from "./NavListSection"
import { SpecProps, DefaultProps } from "../../types";
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
 * Description: Page for viewing the detailed information on a specialization
 */

function ViewSpecialization(props: DefaultProps)
{
    const history = useHistory();
    const id = history.location.state as string;  //Retrieve id for specialization information to get

    let base : SpecProps = {
        specCode : id
    };

    const [isLoading, setLoading ] = useState(true);
    const [isError, setError ] = useState(false);
    const [error, setErrorContent] = useState<string>();
    const [spec, setSpec] = useState<SpecProps>(base);
    
    //Asynchronously fetch data
    async function fetchData(id: string)
    {
        try
        {
        const {data} = await axios.get(
            'https://ilur318q9c.execute-api.ap-southeast-2.amazonaws.com/Prod/getspec',//'${process.env.REACT_APP_UNITS_API}/getspec',
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

        let resp : SpecProps = {
            specCode : data[0].specCode,
            specName : name,
            specCredits : data[0].Credits,
            specDescription : data[0].Description,
            specInternal : data[0].Internal,
            specMajorAntiReqs : data[0].MajorAntiReqs,
            specSpecAntiReqs : data[0].SpecAntiReqs,
            specUnitAntiReqs : data[0].UnitAntiReqs,
            specUnits : data[0].Units
        };
        
        setSpec(resp);
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

    //Check if error occured
    if (isError)
    {
        return <Error promptTitle="Request Error" promptContent={error as string} showPrompt={true} onAccept={() => BackFunction() } />
    }
    //END IF

    //Assume no internal value
    let internal = (<div/>);

    //Check if no data to display
    if (spec.specInternal !== undefined)
    {
        //Assume specialization not internal to school/course
        let content : string = "This is a specialization external to the the school/course.";
        let heading : string = "Specialization Type - External";

        if (spec.specInternal)
        {
            content = "This is a specialization internal to the the school/course.";
            heading = "Specialization Type - Internal";
        }
        //END IF
            
        internal = <TextSection sectionHeading={heading} sectionContent={content}/>
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
                    {spec.specName} - {spec.specCode}
                </Typography>
                </Grid>
                <Grid item >
                {/*Empty grid item to make title more centre. */}
                </Grid>
            </Grid>
            <Box alignContent="flex-start" >
                <TextSection sectionHeading="Credits" sectionContent={spec.specCredits}/>
                <TextSection sectionHeading="Description" sectionContent={spec.specDescription}/>
                {internal}
                <NavListSection sectionHeading="Units in Specialization" list={spec.specUnits}/>
                <NavListSection sectionHeading="Antirequisite Majors" list={spec.specMajorAntiReqs}/>
                <NavListSection sectionHeading="Antirequisite Specializations" list={spec.specSpecAntiReqs}/>
                <NavListSection sectionHeading="Antirequisite Units" list={spec.specUnitAntiReqs}/>
            </Box>
            </Paper>
        </div>
    );
}

export default styled(ViewSpecialization)`
.backButton {
  background-color: #FFBF00;
  margin: 14px;
}
.titleBar {
  justify-content: space-between;
  align-items: center;
}
`;

