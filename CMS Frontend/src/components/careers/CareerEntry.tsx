import { Paper, Box, Typography } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import styled from "styled-components";

function CareerEntry(props: CareerEntryProps) {
  const history = useHistory();
  function navToCareer() {
    history.push(`/careers/view/${props.career.CareerId}`)
  }
  return (
    <div className={props.className} onClick={() => navToCareer()}>
      <Paper className="clickable">
        <Box padding={2}>
          <Box pb={2}>
            <Typography variant="h6" className="unitTitle">{props.career.Name}</Typography>
          </Box>
          <Typography variant="body1" className="unitContent">{props.career.Description}</Typography>
        </Box>
      </Paper>
    </div>
  )
}

export default styled(CareerEntry)`
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