import { Paper, Box, Typography } from "@material-ui/core";
import styled from "styled-components";
import { TextSectionProps } from "../../types";

function TextSection(props: TextSectionProps) {
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