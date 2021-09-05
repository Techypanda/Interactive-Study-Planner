import { Box, Chip, Container, Paper, Typography } from "@material-ui/core";
import { ReactComponentElement } from "react";
import styled from "styled-components"

function SpecializationDisplay(props: SpecEntryProps) {
  console.log(props.spec)
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
              <Typography variant="h6" className="unitTitle"><span className="bold">Spec Name: </span>{props.spec.Name}</Typography>
            </Box>
            <Typography variant="body1"><span className="bold">Description: </span>{props.spec.Description}</Typography>
            <Typography variant="body1"><span className="bold">Spec Code: </span>{props.spec.SpecializationCode}</Typography>
            <Typography variant="body1"><span className="bold">Credits: </span>{props.spec.Credits}</Typography>
            <Typography variant="body1"><span className="bold">Is An Internal Spec: </span>{props.spec.Internal.toString()}</Typography>
            <Typography variant="body1"><span className="bold">Units: </span>{props.spec.Units.map((unitCode, idx) => <Chip key={idx} label={unitCode} color="primary" />)}</Typography>
            <span className="bold">Unit Antirequistes: </span>
            <Box>
              {comprehendLogic(props.spec.UnitAntiReqs).map((e, _) => <>{e}</>)}
            </Box>
            <span className="bold">Spec Antirequistes: </span>
            <Box>
              {comprehendLogic(props.spec.SpecAntiReqs).map((e, _) => <>{e}</>)}
            </Box>
            <span className="bold">Major Antirequistes: </span>
            <Box>
              {comprehendLogic(props.spec.MajorAntiReqs).map((e, _) => <>{e}</>)}
            </Box>
          </Box>
        </Paper>
      </Box>
    </div>
  )
}
export default styled(SpecializationDisplay)`
.unitTitle {
  text-transform: capitalize;
  color: #0088ca;
}
.bold {
  font-weight: 600;
}
`;