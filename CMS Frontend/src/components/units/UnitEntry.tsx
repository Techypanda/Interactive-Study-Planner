import { Paper, Box, Typography } from "@material-ui/core";
import styled from "styled-components";
import { UnitEntryProps } from "../../types";

function UnitEntry(props: UnitEntryProps) {

  return (
    <Paper className={props.className}>
      <Box padding={2}>
        <Typography variant="h6">{props.unitTitle}</Typography>
        <Typography variant="body1" className="unitContent">{props.unitContent}</Typography>
      </Box>
    </Paper>
  )
}

export default styled(UnitEntry)`
.unitContent {
  max-height: 100px;
  overflow-y: scroll;
}
`;