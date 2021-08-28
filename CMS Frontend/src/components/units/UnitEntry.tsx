import { Paper, Box, Typography } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import { UnitEntryProps } from "../../types";

function UnitEntry(props: UnitEntryProps) {
  const history = useHistory();
  function navToUnit() {
    history.push(`/units/view/${props.unit.UnitCode}`)
  }
  return (
    <div className={props.className} onClick={() => navToUnit()}>
      <Paper className="clickable">
        <Box padding={2}>
          <Box pb={2}>
            <Typography variant="h6" className="unitTitle">{props.unit.Name}</Typography>
          </Box>
          <Typography variant="body1" className="unitContent">{props.unit.Description}</Typography>
        </Box>
      </Paper>
    </div>
  )
}

export default styled(UnitEntry)`
.unitContent {
  max-height: 100px;
  overflow-y: scroll;
}
.clickable {
  cursor: pointer;
}
.unitTitle {
  text-transform: capitalize;
  color: #0088ca;
}
`;