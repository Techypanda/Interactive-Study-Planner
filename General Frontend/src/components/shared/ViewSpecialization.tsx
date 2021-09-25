import { Box, Button, Grid, Paper, Typography } from "@material-ui/core";
import TextSection from "./TextSection"
import NavListSection from "./NavListSection"
import { SpecProps, DefaultProps } from "../../types";
import styled from "styled-components";
import { useHistory, useParams } from "react-router-dom";
import { useSpecialization } from "./hooks";
import { BounceLoader } from "react-spinners";
import NotFound from "../../pages/NotFound";

/*
 * Author: Matthew Loe
 * Student Id: 19452425
 * Date Last Modified: 25/09/2021
 * Description: Page for viewing the detailed information on a specialization
 */

function ViewSpecialization(props: DefaultProps)
{
    const history = useHistory();
    const { id } = useParams<{ id: string }>();     //Retreive id from url param
    const specialization = useSpecialization(id);   //Get data

    //Returns user to their previous page
    function BackFunction()
    {
        history.goBack();
    }

    //Check if still loading/getting data
    if (specialization.isLoading)
    {
        return (<BounceLoader color="#1473AB" loading={true} size={150}/>);
    }
    //END IF

    //Check if error occured
    if (specialization.isError)
    {
        return <NotFound />
    }
    //END IF

    let responseData = specialization.data?.data!;

    //Making uppercase the words in the name
    let name : string = responseData[0].Name;
    let parts : string[] = name.split(" ");

    for (let ii=0; ii < parts.length; ii++)
    {
        parts[ii] = parts[ii][0].toUpperCase() + parts[ii].substr(1);
    }
    //END FOR

    name = parts.join(" ");

    let data : SpecProps = {
        specCode : responseData[0].SpecializationCode,
        specName : name,
        specCredits : responseData[0].Credits,
        specDescription : responseData[0].Description,
        specInternal : responseData[0].Internal,
        specMajorAntiReqs : responseData[0].MajorAntiReqs,
        specSpecAntiReqs : responseData[0].SpecAntiReqs,
        specUnitAntiReqs : responseData[0].UnitAntiReqs,
        specUnits : responseData[0].Units
    };

    //Assume no internal value
    let internal = (<div/>);

    //Check if no data to display
    if (data.specInternal !== undefined)
    {
        //Assume specialization not internal to school/course
        let content : string = "This is a specialization external to the the school/course.";
        let heading : string = "Specialization Type - External";

        if (data.specInternal)
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
                    {data.specName} - {data.specCode}
                </Typography>
                </Grid>
                <Grid item >
                {/*Empty grid item to make title more centre. */}
                </Grid>
            </Grid>
            <Box alignContent="flex-start" >
                <TextSection sectionHeading="Credits" sectionContent={data.specCredits}/>
                <TextSection sectionHeading="Description" sectionContent={data.specDescription}/>
                {internal}
                <NavListSection sectionHeading="Units in Specialization" list={data.specUnits}/>
                <NavListSection sectionHeading="Antirequisite Majors" list={data.specMajorAntiReqs}/>
                <NavListSection sectionHeading="Antirequisite Specializations" list={data.specSpecAntiReqs}/>
                <NavListSection sectionHeading="Antirequisite Units" list={data.specUnitAntiReqs}/>
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

