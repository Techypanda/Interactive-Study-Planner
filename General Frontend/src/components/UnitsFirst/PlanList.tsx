import { Box, Typography } from "@material-ui/core";
import styled from "styled-components";
import { useRemainingHeight } from "../../api/hooks";
import { DefaultProps } from "../../types";

function PlanList(props: DefaultProps) {
  const height = useRemainingHeight();
  return (
    <div className={props.className}>
      <Box className="planList" minHeight={height}>
        <Box pt={2}>
          <Typography variant="h5">Current Plan</Typography>
        </Box>
      </Box>
    </div>
  )
}
export default styled(PlanList)`
.planList {
  border-right: 2px solid #cc9900;
}
`;