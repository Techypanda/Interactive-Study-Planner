import { Paper, Box, Typography } from "@material-ui/core";
import styled from "styled-components";
import { TextSectionProps } from "../../types";

function TextSection(props: TextSectionProps) {
  return (
    <Paper className={props.className}>
      <Box padding={2}>
        <Typography variant="h4" align="left" style={{ wordWrap: "break-word" }}>
            {props.sectionHeading}
        </Typography>
        <Typography variant="body1" className="careerContent">
            {props.sectionContent}
        </Typography>
      </Box>
    </Paper>
  )
}

export default styled(TextSection)`
.careerContent {
  max-height: 100px;
  overflow-y: scroll;
}
`;