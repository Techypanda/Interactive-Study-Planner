import { Box, Button, Container, Typography } from "@material-ui/core";
import { useHistory } from "react-router";
import styled from "styled-components";
import { DefaultProps } from "../../types";

function FilledPlan(props: DefaultProps) {
  const history = useHistory()
  return (
    <Container className={props.className}>
      <Box mt={8}>
        <Box mb={2}>
          <Typography variant="h5">Your Plan Is Now Full</Typography>
        </Box>
        <Typography variant="subtitle1">You can view your available career paths on the list to the right of the screen, if you want more information you can click on the career to open a career information view.<br />You can also click continue to move onto planning your study plan.</Typography>
        <Box mt={3}>
          <Box mr={2} display="inline">
            <Button className="curtinBtn" variant="contained" onClick={() => history.push('/')}>Return To Main Menu</Button>
          </Box>
          <Box ml={2} display="inline">
            <Button className="curtinBtn" variant="contained" onClick={() => history.push('/timetable')}>Continue To Study Plan</Button>
          </Box>
        </Box>
      </Box>
    </Container>
  )
}
export default styled(FilledPlan)`
.curtinBtn {
  background-color: #f3c32d !important;
}
`;