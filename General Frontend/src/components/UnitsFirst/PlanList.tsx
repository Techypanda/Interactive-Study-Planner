import { Box, Typography } from "@material-ui/core";
import styled from "styled-components";
import { DefaultProps } from "../../types";

function PlanList(props: DefaultProps) {
  return (
    <div className={props.className}>
      <Box className="planList" pt={2}>
        <Typography variant="h5">Current Plan</Typography>
      </Box>
    </div>
  )
}
export default styled(PlanList)`
.planList {
  border-right: 2px solid #cc9900;
}
`;