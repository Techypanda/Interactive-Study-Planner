import { Paper, Box, Typography } from "@material-ui/core";
import styled from "styled-components";
import { TextSectionProps } from "../../types";

function TextSection(props: TextSectionProps) {
  return (
    <Paper className={props.className}>
      <Box padding={2}>
        <Typography variant="h4" className="sectionHeading">
            {props.sectionHeading}
        </Typography>
        <Typography variant="body1" className="sectionContent">
            {props.sectionContent}
        </Typography>
      </Box>
    </Paper>
  )
}

export default styled(TextSection)`
.sectionHeading {
  align: left;
}
.sectionContent {
  max-height: 100px;
  overflow-y: scroll;
  word-wrap: break-word;
  align: left;
}
`;