import { Box, Chip, Paper, Typography } from "@material-ui/core";
import styled from "styled-components"

function MajorDisplay(props: MajorEntryProps) {
  function comprehendLogic(val: Array<Array<string>>): Array<JSX.Element> {
    const out: Array<JSX.Element> = []
    val.forEach((group, i) => {
      let str = `Entry Path ${i + 1} - `;
      group.forEach((path) => {
        str = `${str}${path} and `
      })
      str = str.trimEnd()
      str = str.substring(0, str.lastIndexOf(" "))
      str = str.trimEnd()
      out.push(
        <Typography>{str}</Typography>
      )
    })
    return out
  }
  return (
    <div className={props.className}>
      <Box mt={2}>
        <Paper className="clickable">
          <Box padding={2}>
            <Box pb={1}>
              <Typography variant="h6" className="unitTitle"><span className="bold">Major Name: </span>{props.major.Name}</Typography>
            </Box>
            <Typography variant="body1"><span className="bold">Description: </span>{props.major.Description}</Typography>
            <Typography variant="body1"><span className="bold">Major Code: </span>{props.major.MajorCode}</Typography>
            <Typography variant="body1"><span className="bold">Credits: </span>{props.major.Credits}</Typography>
            <Typography variant="body1"><span className="bold">Units: </span>{props.major.Units.map((unitCode, idx) => <Chip key={idx} label={unitCode} color="primary" />)}</Typography>
            <span className="bold">Unit Antirequistes: </span>
            <Box>
              {comprehendLogic(props.major.UnitAntiReqs).map((e, _) => <>{e}</>)}
            </Box>
            <span className="bold">Spec Antirequistes: </span>
            <Box>
              {comprehendLogic(props.major.SpecAntiReqs).map((e, _) => <>{e}</>)}
            </Box>
          </Box>
        </Paper>
      </Box>
    </div>
  )
}
export default styled(MajorDisplay)`
.unitTitle {
  text-transform: capitalize;
  color: #0088ca;
}
.bold {
  font-weight: 600;
}
`;