import { Box, Button, Container, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, LinearProgress, Typography } from "@material-ui/core";
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import axios, { AxiosError } from "axios";
import { useState } from "react";
import { useQueryClient } from "react-query";
import { useHistory, useParams } from "react-router-dom";
import styled from "styled-components";
import { useUnit } from "../../api/hooks";
import Error from "../../components/shared/Error";
import UnitDisplay from "../../components/units/UnitDisplay";
import { DefaultProps, Unit } from "../../types";
import NotFound from "../NotFound";

function ViewUnit(props: DefaultProps) {
  const { UnitCode } = useParams<{ UnitCode: string }>();
  const unit = useUnit(UnitCode)
  const [displayDel, setDisplayDel] = useState(false);
  const history = useHistory();
  const client = useQueryClient();
  const [loading, setLoading] = useState(false);
  function delUnit() {
    setDisplayDel(false);
    setLoading(true);
    axios.post(`${process.env.REACT_APP_UNIT_ADMIN_API}/deleteunit`, {
      unitCode: ((unit.data?.data!) as unknown as Array<Unit>)[0].UnitCode
    }, { headers: { 'Authorization': client.getQueryData("token") } }).then(() => {
      setLoading(false);
      client.removeQueries("units")
      history.push("/units")
    }).catch((err) => {
      const tmp = err as AxiosError
      setLoading(false);
      alert(tmp.response?.data)
    })
  }
  return (
    <div className={props.className}>
      {(unit.isLoading || loading)
        ? <LinearProgress />
        : <>
          {unit.isError
            ? <NotFound />
            :
            <>
              <Container>
                <UnitDisplay unit={((unit.data?.data!) as unknown as Array<Unit>)[0]} />
                <Box mt={1}>
                  <Box mr={1} display="inline-block">
                    <Button variant="contained" color="primary" className="fixright" onClick={() => history.push(`/units/edit/${((unit.data?.data!) as unknown as Array<Unit>)[0].UnitCode}`)}>
                      <EditIcon /> - Edit
                    </Button>
                  </Box>
                  <Button variant="contained" color="secondary" className="fixright" onClick={() => setDisplayDel(true)}>
                    <DeleteIcon /> - Delete
                  </Button>
                </Box>
              </Container>
              <Dialog
                open={displayDel}
                onClose={() => setDisplayDel(false)}
                aria-labelledby="delete-alert-title"
                aria-describedby="delete-alert-description"
              >
                <DialogTitle id="delete-alert-title">Are You Sure You Want To Delete {((unit.data?.data!) as unknown as Array<Unit>)[0].UnitCode}?</DialogTitle>
                <DialogContent>
                  <DialogContentText id="delete-alert-description">
                    Are you sure you want to permanently delete this unit?<br />
                    There is no way to get this data back.
                  </DialogContentText>
                </DialogContent>
                <DialogActions>
                  <Button onClick={() => setDisplayDel(false)} color="primary">
                    Nevermind
                  </Button>
                  <Button onClick={() => delUnit()} color="secondary" autoFocus>
                    Confirm
                  </Button>
                </DialogActions>
              </Dialog>
            </>
          }
        </>}
    </div>
  )
}
export default styled(ViewUnit)`
.fixright {
  padding-right: 25px;
}
`;