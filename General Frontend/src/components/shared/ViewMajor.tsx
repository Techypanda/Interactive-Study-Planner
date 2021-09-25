import { Box, Button, Grid, Paper, Typography } from "@material-ui/core";
import TextSection from "./TextSection"
import NavListSection from "./NavListSection"
import { MajorProps, DefaultProps } from "../../types";
import styled from "styled-components";
import { useHistory, useParams } from "react-router-dom";
import { useMajor } from "./hooks";
import { BounceLoader } from "react-spinners";
import NotFound from "../../pages/NotFound";

/*
 * Author: Matthew Loe
 * Student Id: 19452425
 * Date Last Modified: 25/09/2021
 * Description: Page for viewing the detailed information on a major
 */

function ViewMajor(props: DefaultProps)
{
    const history = useHistory();
    const { id } = useParams<{ id: string }>();     //Retreive id from url param
    const major = useMajor(id);                     //Get data

    //Returns user to their previous page
    function BackFunction()
    {
        history.goBack();
    }

    //Check if still loading/getting data
    if (major.isLoading)
    {
        return (<BounceLoader color="#1473AB" loading={true} size={150}/>);
    }
    //END IF

    if (major.isError)
    {
        return <NotFound />
    }
    //END IF

    let responseData = major.data?.data!;

    //Making uppercase the words in the name
    let name : string = responseData[0].Name;
    let parts : string[] = name.split(" ");

    for (let ii=0; ii < parts.length; ii++)
    {
        parts[ii] = parts[ii][0].toUpperCase() + parts[ii].substr(1);
    }
    //END FOR

    name = parts.join(" ");

    let data : MajorProps = {
        majorCode : responseData[0].MajorCode,
        majorName : name,
        majorCredits : responseData[0].Credits,
        majorDescription : responseData[0].Description,
        majorUnits : responseData[0].Units,
        majorSpecAntiReqs : responseData[0].SpecAntiReqs,
        majorUnitAntiReqs : responseData[0].UnitAntiReqs
    };

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
                    {data.majorName} - {data.majorCode}
                </Typography>
                </Grid>
                <Grid item >
                {/*Empty grid item to make title more centre. */}
                </Grid>
            </Grid>
            <Box alignContent="flex-start" >
                <TextSection sectionHeading="Credits" sectionContent={data.majorCredits}/>
                <TextSection sectionHeading="Description" sectionContent= {data.majorDescription}/>
                <NavListSection sectionHeading="Units in Major" list= {data.majorUnits}/>
                <NavListSection sectionHeading="Antirequisite Specializations" list= {data.majorSpecAntiReqs}/>
                <NavListSection sectionHeading="Antirequisite Units" list= {data.majorUnitAntiReqs}/>
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
