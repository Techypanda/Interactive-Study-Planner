import { Box, Typography } from "@material-ui/core";
import styled from "styled-components";
import { DefaultProps } from "../../types";

function CareerList(props: DefaultProps) {
  return (
    <div className={props.className}>
      <Box className="careerList" pt={2}>
        <Typography variant="h5">Available Careers</Typography>
      </Box>
    </div>
  )
}
export default styled(CareerList)`
.careerList {
  border-left: 2px solid #cc9900;
}
`;