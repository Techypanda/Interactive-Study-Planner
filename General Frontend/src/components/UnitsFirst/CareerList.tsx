import { Box, Paper, Typography } from "@material-ui/core";
import { Work } from "@material-ui/icons";
import { useHistory } from "react-router";
import styled from "styled-components";
import { useRemainingHeight } from "../../api/hooks";
import { CareerListEntryProps, CareerListSPAProps } from "../../types";

function CareerListEntry(props: CareerListEntryProps) {
  return (
    <Paper className={props.className} onClick={props.onClick}>
      <Box display="flex" className={props.className} py={2}>
        <Box marginLeft={2}>
          <Typography variant="subtitle1" className="careername">{props.title}</Typography>
        </Box>
        <Box flexGrow={1} />
        <Box marginRight={2}>
          <Work className="careericon" />
        </Box>
      </Box>
    </Paper>
  )
}

function CareerList(props: CareerListSPAProps) {
  const history = useHistory()
  const height = useRemainingHeight();
  return (
    <div className={`${props.className} fh`}>
      <Box className="careerList" minHeight={height} height="100%">
        <Box pt={2}>
          <Typography variant="h5">Available Careers</Typography>
          {props.careers.map((career) => <CareerListEntry className="stylethetext clickable" onClick={() => history.push(`/InfoPage/ViewCareer/${career.CareerId}`)} title={career.Name} key={career.CareerId} />)}
        </Box>
      </Box>
    </div>
  )
}
export default styled(CareerList)`
.careerList {
  border-left: 2px solid #cc9900;
}
.careername {
  display: inline-block;
}
.careericon {
  vertical-align: bottom;
}
.stylethetext {
  text-transform: capitalize;
}
.clickable {
  cursor: pointer;
}
`;