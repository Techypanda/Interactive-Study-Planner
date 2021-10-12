import { Box, Tooltip, Typography } from "@material-ui/core";
import styled from "styled-components";
import { PlanExplainProps } from "../../types";

function PlanExplain(props: PlanExplainProps) {
  return (
    <div className={props.className}>
      <Box display="flex" py={1} px={2} className="optionSelect">
        <Box pr={2}>
          <Typography variant="caption" display="inline" className="optionSelectTitle">{props.title}</Typography>
        </Box>
        <Box flexGrow={1} />
        <Tooltip title={props.explaination}>
          <Typography className="question">?</Typography>
        </Tooltip>
      </Box>
    </div>
  )
}
export default styled(PlanExplain)`
.optionSelect {
  border: 2px solid #cc9900;
}
.question {
  background-color: #1473ab;
  height: 25px;
  width: 25px;
  border-radius: 100%;
  border: 2px solid #cc9900;
  color: #FFF !important;
  cursor: pointer;
}
.optionSelectTitle {
  line-height: 29px;
}
`;