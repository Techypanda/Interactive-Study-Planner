import { Box, Grid, Paper, Typography } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import styled from "styled-components";

function Landing(props: DefaultProps) {
  const history = useHistory();
  return (
    <Box id="landing" className={props.className} paddingTop={4}>
      <Typography variant="h4" align="center">Hi {props.username} - Welcome To The Content Management System</Typography>
      <Typography variant="h5" align="center">What would you like to do?</Typography>
      <Box marginTop={5}>
        <Grid container justify="space-evenly">
          <Grid item xs={4}>
            <Paper className="cardEntry" onClick={() => history.push('/units')}>
              <Box padding={2}>
                <Typography variant="h6" align="center">Manage Units</Typography>
                <Typography variant="body1" align="center">Create/Delete/Update/View Units available to the general user</Typography>
              </Box>
            </Paper>
          </Grid>
          <Grid item xs={4}>
            <Paper className="cardEntry" onClick={() => history.push('/majors')}>
              <Box padding={2}>
                <Typography variant="h6" align="center">Manage Majors</Typography>
                <Typography variant="body1" align="center">Create/Delete/Update/View Majors available to the general user</Typography>
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </Box>
      <Box marginTop={5}>
        <Grid container justify="space-evenly">
          <Grid item xs={4}>
            <Paper className="cardEntry" onClick={() => history.push('/careers')}>
              <Box padding={2}>
                <Typography variant="h6" align="center">Manage Careers</Typography>
                <Typography variant="body1" align="center">Create/Delete/Update/View Careers available to the general user</Typography>
              </Box>
            </Paper>
          </Grid>
          <Grid item xs={4}>
            <Paper className="cardEntry" onClick={() => history.push('/specializations')}>
              <Box padding={2}>
                <Typography variant="h6" align="center">Manage Specializations</Typography>
                <Typography variant="body1" align="center">Create/Delete/Update/View Specializations available to the general user</Typography>
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </Box>
  )
}

export default styled(Landing)`
  word-wrap: break-word;
  .cardEntry {
    height: 100% !important;
    cursor: pointer;
    min-height: 400px;
  }
`;