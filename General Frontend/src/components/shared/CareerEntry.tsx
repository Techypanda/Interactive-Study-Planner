import { Paper, Box, Typography } from "@material-ui/core";
import styled from "styled-components";
import { CareerEntryProps } from "../../types";

function CareerEntry(props: CareerEntryProps) {

  return (
    <Paper className={props.className}>
      <Box padding={2}>
        <Typography variant="h6">{props.careerTitle}</Typography>
        <Typography variant="body1" className="careerContent">{props.careerContent}</Typography>
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