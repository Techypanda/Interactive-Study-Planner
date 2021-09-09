import { Paper, Box, Typography } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import styled from "styled-components";

function SpecEntry(props: SpecEntryProps) {
  const history = useHistory();
  function navToSpec() {
    history.push(`/specializations/view/${props.spec.SpecializationCode}`)
  }
  return (
    <div className={props.className} onClick={() => navToSpec()}>
      <Paper className="clickable">
        <Box padding={2}>
          <Box pb={2}>
            <Typography variant="h6" className="unitTitle">{props.spec.Name}</Typography>
          </Box>
          <Typography variant="body1" className="unitContent">{props.spec.Description}</Typography>
        </Box>
      </Paper>
    </div>
  )
}

export default styled(SpecEntry)`
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