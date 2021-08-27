import { Paper, Box, Typography } from "@material-ui/core";
import styled from "styled-components";
import { TextSectionProps } from "../../types";

/*
 * Author: Matthew Loe
 * Student Id: 19452425
 * Date Last Modified: 27/08/2021
 * Description: Returns formatted text section
 */
function TextSection(props: TextSectionProps)
{
  //Check if no data to display
  if (props.sectionContent === undefined)
  {
      return (<div/>);
  }
  //END IF

  return (
      <Box className={props.className} padding={2} >
        <Typography variant="h4" className="sectionHeading">
            {props.sectionHeading}
        </Typography>
        <Typography variant="body1" className="sectionContent">
            {props.sectionContent}
        </Typography>
      </Box>
  )
}

export default styled(TextSection)`
.sectionHeading {
  text-align: left;
}
.sectionContent {
  word-wrap: break-word;
  text-align: left;
}
`;