import { Box, Grid, Paper, Typography } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import { ReactComponent as UnitIcon } from "../static/undraw_education_f8ru.svg"
import { ReactComponent as CareerIcon } from "../static/undraw_career_progress_ivdb.svg"
import { ReactComponent as SpecializationIcon } from "../static/undraw_stand_out_1oag.svg"
import { ReactComponent as MajorIcon } from "../static/undraw_certificate_343v.svg"
import { ReactComponent as BulkIcon } from "../static/undraw_Order_delivered_re_v4ab.svg"
import styled from "styled-components";

function Landing(props: DefaultProps) {
  const history = useHistory();
  return (
    <Box id="landing" className={props.className} paddingTop={4}>
      <Typography variant="h4" align="center">Hi {props.username} - Welcome To The Content Management System</Typography>
      <Typography variant="h5" align="center">What would you like to do?</Typography>
      <Box marginTop={5}>
        <Grid container justify="space-evenly">
          <Grid item md={4} xs={12}>
            <Box display="flex" justifyContent="center">
              <Paper className="cardEntry" onClick={() => history.push('/units')}>
                <Box padding={2}>
                  <Typography variant="h6" align="center">Manage Units</Typography>
                  <Typography variant="body1" align="center">Create/Delete/Update/View Units available to the general user</Typography>
                  <Box mt={2}>
                    <UnitIcon height="300px" width="100%" />
                  </Box>
                </Box>
              </Paper>
            </Box>
          </Grid>
          <Grid item md={4} xs={12}>
            <Box display="flex" justifyContent="center">
              <Paper className="cardEntry" onClick={() => history.push('/majors')}>
                <Box padding={2}>
                  <Typography variant="h6" align="center">Manage Majors</Typography>
                  <Typography variant="body1" align="center">Create/Delete/Update/View Majors available to the general user</Typography>
                  <Box mt={2}>
                    <MajorIcon height="300px" width="100%" />
                  </Box>
                </Box>
              </Paper>
            </Box>
          </Grid>
        </Grid>
      </Box>
      <Box marginTop={5}>
        <Grid container justify="space-evenly">
          <Grid item md={4} xs={12}>
            <Box display="flex" justifyContent="center">
              <Paper className="cardEntry" onClick={() => history.push('/careers')}>
                <Box padding={2}>
                  <Typography variant="h6" align="center">Manage Careers</Typography>
                  <Typography variant="body1" align="center">Create/Delete/Update/View Careers available to the general user</Typography>
                  <Box mt={2}>
                    <CareerIcon height="300px" width="100%" />
                  </Box>
                </Box>
              </Paper>
            </Box>
          </Grid>
          <Grid item md={4} xs={12}>
            <Box display="flex" justifyContent="center">
              <Paper className="cardEntry" onClick={() => history.push('/specializations')}>
                <Box padding={2}>
                  <Typography variant="h6" align="center">Manage Specializations</Typography>
                  <Typography variant="body1" align="center">Create/Delete/Update/View Specializations available to the general user</Typography>
                  <Box mt={2}>
                    <SpecializationIcon height="300px" width="100%" />
                  </Box>
                </Box>
              </Paper>
            </Box>
          </Grid>
        </Grid>
      </Box>
      <Box marginTop={5}>
        <Grid container justify="space-evenly">
          <Grid item md={4} xs={12}>
            <Box display="flex" justifyContent="center">
              <Paper className="cardEntry" onClick={() => history.push('/csv')}>
                <Box padding={2}>
                  <Typography variant="h6" align="center">Bulk Upload</Typography>
                  <Typography variant="body1" align="center">Upload A CSV To Perform Bulk Operations</Typography>
                  <Box mt={2}>
                    <BulkIcon height="300px" width="100%" />
                  </Box>
                </Box>
              </Paper>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Box>
  )
}

export default styled(Landing)`
  word-wrap: break-word;
  .cardEntry {
    cursor: pointer;
    height: 420px;
    width: 800px;
  }
`;