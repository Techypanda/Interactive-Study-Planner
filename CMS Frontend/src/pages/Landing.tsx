import { Box, Grid, Paper, Typography } from "@material-ui/core";
import { decode } from "jsonwebtoken";
import styled from "styled-components";
import { CognitoJWT, DefaultProps } from "../types";

function Landing(props: DefaultProps) {
  // @ts-ignore
  const decodedToken: CognitoJWT = decode(localStorage.getItem('idToken')!);
  return (
    <Box id="landing" className={props.className} paddingTop={4}>
      <Typography variant="h4" align="center">Hi {decodedToken["cognito:username"]} - Welcome To The Content Management System</Typography>
      <Typography variant="h5" align="center">What would you like to do?</Typography>
      <Box marginTop={5}>
        <Grid container justify="space-evenly">
          <Grid item xs={4}>
            <Paper className="fullHeight">
              <Box padding={2}>
                <Typography variant="h6" align="center">Manage Units</Typography>
                <Typography variant="body1" align="center">Create/Delete/Update/View Units available to the general user</Typography>
              </Box>
            </Paper>
          </Grid>
          <Grid item xs={4}>
            <Paper className="fullHeight">
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
            <Paper className="fullHeight">
              <Box padding={2}>
                <Typography variant="h6" align="center">Manage Careers</Typography>
                <Typography variant="body1" align="center">Create/Delete/Update/View Careers available to the general user</Typography>
              </Box>
            </Paper>
          </Grid>
          <Grid item xs={4}>
            <Paper className="fullHeight">
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
  .fullHeight {
    height: 100% !important;
  }
`;