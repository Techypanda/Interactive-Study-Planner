import { Box, Chip, Paper, Typography } from "@material-ui/core";
import styled from "styled-components"

function CareerDisplay(props: CareerEntryProps) {
  return (
    <div className={props.className}>
      <Box mt={2}>
        <Paper className="clickable">
          <Box padding={2}>
            <Box pb={1}>
              <Typography variant="h6" className="unitTitle"><span className="bold">Career Name: </span>{props.career.Name}</Typography>
            </Box>
            <Typography variant="body1"><span className="bold">Description: </span>{props.career.Description}</Typography>
            <Typography variant="body1"><span className="bold">Major Code: </span>{props.career.CareerId}</Typography>
            <Typography variant="body1"><span className="bold">Industry: </span>{props.career.Industry}</Typography>
            <Typography variant="body1"><span className="bold">Requirements: </span>{props.career.Requirements.map((unitCode, idx) => <Chip key={idx} label={unitCode} color="primary" />)}</Typography>
            <Typography variant="body1"><span className="bold">Traits: </span>{props.career.Traits.map((trait, idx) => <Chip key={idx} label={trait} color="secondary" />)}</Typography>
          </Box>
        </Paper>
      </Box>
    </div>
  )
}
export default styled(CareerDisplay)`
.unitTitle {
  text-transform: capitalize;
  color: #0088ca;
}
.bold {
  font-weight: 600;
}
`;