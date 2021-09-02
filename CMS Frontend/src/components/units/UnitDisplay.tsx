import { Box, Container, Paper, Typography } from "@material-ui/core";
import { ReactComponentElement } from "react";
import styled from "styled-components"

function UnitDisplay(props: UnitEntryProps) {
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
              <Typography variant="h6" className="unitTitle"><span className="bold">Unit Name: </span>{props.unit.Name}</Typography>
            </Box>
            <Typography variant="body1"><span className="bold">Description: </span>{props.unit.Description}</Typography>
            <Typography variant="body1"><span className="bold">Unit Code: </span>{props.unit.UnitCode}</Typography>
            <Typography variant="body1"><span className="bold">Delivery: </span>{props.unit.Delivery}</Typography>
            <Typography variant="body1"><span className="bold">Credits: </span>{props.unit.Credits}</Typography>
            <span className="bold">Prerequistes: </span>
            <Box>
              {comprehendLogic(props.unit.Prerequistes).map((e, _) => <>{e}</>)}
            </Box>
            <span className="bold">Corequistes: </span>
            <Box>
              {comprehendLogic(props.unit.Corequistes).map((e, _) => <>{e}</>)}
            </Box>
            <span className="bold">Antirequistes: </span>
            <Box>
              {comprehendLogic(props.unit.Antirequistes).map((e, _) => <>{e}</>)}
            </Box>
          </Box>
        </Paper>
      </Box>
    </div>
  )
}
export default styled(UnitDisplay)`
.unitTitle {
  text-transform: capitalize;
  color: #0088ca;
}
.bold {
  font-weight: 600;
}
`;