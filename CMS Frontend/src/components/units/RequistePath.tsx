import { Fab, Grid, Paper, Box, TextField, Tooltip, Chip } from "@material-ui/core";
import { Add, Delete } from "@material-ui/icons";
import { useState } from "react";
import styled from "styled-components"

function RequistePath(props: RequistePathProps) {
  const [reqVal, setReqVal] = useState("");
  function addRequiste(requiste: string) {
    const requistez = [...props.path]
    let donotadd = false;
    props.path.forEach((temp) => {
      if (requiste.toUpperCase() === temp.toUpperCase()) {
        donotadd = true;
      }
    })
    if (!donotadd) {
      requistez.push(requiste)
    }
    props.updatePath(requistez, props.idx)
  }
  function deleteRequiste(requiste: string) {
    const requistez: Array<string> = []
    props.path.forEach((temp) => {
      if (requiste.toUpperCase() !== temp.toUpperCase()) {
        requistez.push(temp);
      }
    })
    props.updatePath(requistez, props.idx);
  }
  return (
    <Paper>
      <Box p={2}>
        <Grid container>
          <Grid item xs={10}>
            <>
              {props.path.map((pathReq, idx) =>
                <Chip label={pathReq} key={idx} onDelete={() => deleteRequiste(pathReq)} />
              )}
            </>
          </Grid>
          <Grid item xs={2}>
            <Box display="flex" justifyContent="flex-end">
              <Tooltip title="Remove Requiste Path">
                <Fab color="secondary" onClick={() => props.delete(props.idx)}>
                  <Delete />
                </Fab>
              </Tooltip>
            </Box>
          </Grid>
        </Grid>
        <Grid container>
          <Grid item xs={10}>
            <Box mt={1}>
              <TextField id="requiste-input" label="Requiste Of Unit - Optional" placeholder="Enter Requiste Code i.e COMP6001,COMP2000" variant="outlined" fullWidth value={reqVal} onChange={(e) => setReqVal(e.target.value)} />
            </Box>
          </Grid>
          <Grid item xs={2}>
            <Box display="flex" justifyContent="flex-end" mt={1}>
              <Tooltip title="Add Requiste">
                <Fab color="primary" onClick={() => addRequiste(reqVal)}>
                  <Add />
                </Fab>
              </Tooltip>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Paper>
  )
}
export default styled(RequistePath)`
`;