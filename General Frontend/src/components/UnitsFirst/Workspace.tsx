import { Box, MenuItem, Select, Tooltip, Typography } from "@material-ui/core";
import { useState } from "react";
import styled from "styled-components";
import { DefaultProps } from "../../types";
import PlanExplain from "./PlanExplain";

function Workspace(props: DefaultProps) {
  const [view, setView] = useState("Majors");
  return (
    <Box p={2} className={props.className}>
      <Box display="flex">
        <Box width="250px" display="inline-block" textAlign="left">
          <Typography align="left">Currently Viewing</Typography>
          <Select
            labelId="select-view"
            value={view}
            fullWidth
            variant="outlined"
            className="leftalign"
            onChange={(e) => setView(e.target.value as string)}
          >
            <MenuItem value={"Majors"}>Majors</MenuItem>
            <MenuItem value={"Specializations"}>Specializations</MenuItem>
            <MenuItem value={"Units"}>Units</MenuItem>
          </Select>
        </Box>
        <Box flexGrow={1} />
        <Box display="inline">
          <Typography align="left">What Plans Are Available?</Typography>
          <Typography align="left">At Curtin Medical we support the following type of plans</Typography>
          <Box mb={1}>
            <PlanExplain title={"DOUBLE MAJOR"} explaination={"You can select two majors, this will allow you to specialize into two concise fields"} />
          </Box>
          <Box mb={1}>
            <PlanExplain title={"MAIN MAJOR + 2 INTERNAL SPECIALIZATIONS"} explaination={"You can select a main major, then two internal specializations, this gives the benefit of flexibility while remaining close to our courses."} />
          </Box>
          <Box mb={1}>
            <PlanExplain title={"MAIN MAJOR + 1 INTERNAL SPECIALIZATION + 1 EXTERNAL SPECIALIZATION"} explaination={"You can select a main major, then a internal specialization, then a external specialization, this is currently not official available"} />
          </Box>
          <PlanExplain title={"MAIN MAJOR + 1 INTERNAL SPECIALIZATION + 4 OPTIONAL UNITS"} explaination={"You can a main major then 4 optional units, this will give you the greatest flexibility but comes with the drawback of if you select bad electives you will have a less direct path to some careers"} />
        </Box>
      </Box>
    </Box>
  )
}
export default styled(Workspace)`
.fullWidth {
  width: 100% !important;
}
.leftalign {
  text-align: left;
}
`;