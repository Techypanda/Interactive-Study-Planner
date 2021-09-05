import { Paper, Box, Typography } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import styled from "styled-components";

function MajorEntry(props: MajorEntryProps) {
  const history = useHistory();
  function navToMajor() {
    history.push(`/majors/view/${props.major.MajorCode}`)
  }
  return (
    <div className={props.className} onClick={() => navToMajor()}>
      <Paper className="clickable">
        <Box padding={2}>
          <Box pb={2}>
            <Typography variant="h6" className="unitTitle">{props.major.Name}</Typography>
          </Box>
          <Typography variant="body1" className="unitContent">{props.major.Description}</Typography>
        </Box>
      </Paper>
    </div>
  )
}

export default styled(MajorEntry)`
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