import { Box, MenuItem, Select, Typography } from "@material-ui/core";
import Clear from "@material-ui/icons/Clear";
import styled from "styled-components";
import { useRemainingHeight } from "../../api/hooks";
import { PlanProps } from "../../types";
function titleCase(str: String) { // https://stackoverflow.com/questions/32589197/how-can-i-capitalize-the-first-letter-of-each-word-in-a-string-using-javascript
  var splitStr = str.toLowerCase().split(' ');
  for (var i = 0; i < splitStr.length; i++) {
    splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);
  }
  return splitStr.join(' ');
}
function PlanList(props: PlanProps) {
  const menuVal = props.mainMajor?.Name;
  const height = useRemainingHeight();
  return (
    <div className={`${props.className} fh mh`}>
      <Box className="planList" minHeight={height} height="100%">
        <Box pt={2}>
          <Typography variant="h5">Current Plan</Typography>
          {menuVal ?
            <Select
              variant="outlined"
              fullWidth
              value={menuVal}
              renderValue={(_: any) => { return `Main Major: ${titleCase(menuVal)}` }}
              onChange={(event) => {
                props.updateMainMajor(props.majors[event.target.value as number])
              }}
            >
              {props.majors.map((major, idx) => <MenuItem key={major.MajorCode} value={idx}>
                {major.Name}
              </MenuItem>)}
            </Select> : <></>
          }
          {props.plan.doubleMajor &&
            <Box p={2} border="1px solid #000" display="flex">
              <Typography className="clipIfTooLong">DMajor: {props.plan.doubleMajor.Name}</Typography>
              <Box flexGrow={1} />
              <Clear className="clearColor" onClick={() => props.removeFromPlan(props.plan.doubleMajor!)} />
            </Box> 
          }
          {props.plan.optionalUnits?.map((unit) => 
            <Box p={2} border="1px solid #000" display="flex">
              <Typography className="clipIfTooLong">OUnit: {unit.Name}</Typography>
              <Box flexGrow={1} />
              <Clear className="clearColor" onClick={() => props.removeFromPlan(unit)} />
            </Box>
          )}
          {props.plan.specializations?.map((spec) => 
            <Box p={2} border="1px solid #000" display="flex">
              <Typography className="clipIfTooLong">{spec.Internal ? "ISpec" : "ESpec"}: {spec.Name}</Typography>
              <Box flexGrow={1} />
              <Clear className="clearColor" onClick={() => props.removeFromPlan(spec)} />
            </Box>
          )}
        </Box>
      </Box>
    </div>
  )
}
export default styled(PlanList)`
.planList {
  border-right: 2px solid #cc9900;
}
.clipIfTooLong {
  max-width: 80%;
  overflow: hidden;
  white-space: nowrap;
}
.clearColor {
  color: #b42121;
  cursor: pointer;
}
`;