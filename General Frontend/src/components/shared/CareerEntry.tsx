import { Paper, Box, Typography } from "@material-ui/core";
import styled from "styled-components";
import { EntryProps } from "../../types";

function CareerEntry(props: EntryProps) {

  return (
    <Paper className={props.className}>
      <Box padding={2}>
        <Typography variant="h6">{props.title}</Typography>
        <Typography variant="body1" className="careerContent">{props.content}</Typography>
      </Box>
    </Paper>
  )
}

export default styled(CareerEntry)`
.careerContent {
  max-height: 100px;
  overflow-y: scroll;
}
`;