import { Box, Button, Grid, Paper, Typography } from "@material-ui/core";
import TextSection from "./TextSection"
import ListSection from "./ListSection"
import NavListSection from "./NavListSection"
import { CareerProps, DefaultProps } from "../../types";
import styled from "styled-components";
import { useHistory, useParams } from "react-router-dom";
import LoadingScreen from "./Loading";
import { useCareer } from "./hooks";
import NotFound from "../../pages/NotFound";

/*
 * Author: Matthew Loe
 * Student Id: 19452425
 * Date Last Modified: 12/09/2021
 * Description: Page for viewing the detailed information on a career
 */

//Retrieves career information and returns in html
function ViewCareer(props: DefaultProps)
{
    const history = useHistory();
    const { id } = useParams<{ id: string }>();     //Retreive id from url param
    const career = useCareer(id);                   //Get data

    //Returns user to their previous page
    function BackFunction()
    {
        history.goBack();
    }

    //Check if still loading/getting data
    if (career.isLoading)
    {
        return (<LoadingScreen/>);
    }
    //END IF

    if (career.isError)
    {
        
        return <NotFound />
    }
    //END IF

    let responseData = career.data?.data!.Item;

    if (!responseData)  //Check for undefined
    {
        return <NotFound />
    }
    else
    {
        //Parse response
        //Making uppercase the words in the name
        let name : string = responseData["Name"];
        let parts : string[] = name.split(" ");

        for (let ii=0; ii < parts.length; ii++)
        {
            parts[ii] = parts[ii][0].toUpperCase() + parts[ii].substr(1);
        }
        //END FOR

        name = parts.join(" ");

        let traits : string[] = responseData["Traits"];

        for (let ii=0; ii < traits.length; ii++)
        {
            traits[ii] = traits[ii][0].toUpperCase() + traits[ii].substr(1);
        }
        //END FOR

        let data : CareerProps = {
            careerName : name,
            careerDescription : responseData["Description"],
            careerIndustry : responseData["Industry"],
            careerReqs : responseData["Requirements"],
            careerTraits : traits
        };

        //Check for no name
        if (data.careerName === undefined)
        {
            responseData.careerName = "No career name";
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
                        {data.careerName}
                    </Typography>
                    </Grid>
                    <Grid item >
                    {/*Empty grid item to make title more centre. */}
                    </Grid>
                </Grid>
                <Box alignContent="flex-start" >
                    <TextSection sectionHeading="Industry" sectionContent= {data.careerIndustry}/>
                    <TextSection sectionHeading="Description" sectionContent= {data.careerDescription}/>
                    <NavListSection sectionHeading="Suggested Career Requirements" list= {data.careerReqs}/>
                    <ListSection sectionHeading="Compatible Traits" list= {data.careerTraits}/>
                </Box>
                </Paper>
            </div>
        );
    }
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
