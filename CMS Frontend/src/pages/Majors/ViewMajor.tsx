import { Box, Button, Container, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, LinearProgress, Typography } from "@material-ui/core";
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import axios, { AxiosError } from "axios";
import { useState } from "react";
import { useQueryClient } from "react-query";
import { useHistory, useParams } from "react-router-dom";
import styled from "styled-components";
import { useMajor } from "../../api/hooks";
import MajorDisplay from "../../components/majors/MajorDisplay";
import Error from "../../components/shared/Error";
import UnitDisplay from "../../components/units/UnitDisplay";
import NotFound from "../NotFound";

function ViewMajor(props: DefaultProps) {
  const { MajorCode } = useParams<{ MajorCode: string }>();
  const major = useMajor(MajorCode)
  const [displayDel, setDisplayDel] = useState(false);
  const history = useHistory();
  const client = useQueryClient();
  const [loading, setLoading] = useState(false);

  function delMajor() {
    setDisplayDel(false);
    setLoading(true);
    axios.post(`${process.env.REACT_APP_UNIT_ADMIN_API}/deletemajor`, {
      majorCode: ((major.data?.data!) as unknown as Array<Major>)[0].MajorCode // max made the get return a array
    }, { headers: { 'Authorization': client.getQueryData("token") } }).then(() => {
      setLoading(false);
      client.removeQueries("majors")
      history.push("/majors")
    }).catch((err) => {
      const tmp = err as AxiosError
      setLoading(false);
      alert(tmp.response?.data)
    })
  }
  return (
    <div className={props.className}>
      {(major.isLoading || loading)
        ? <LinearProgress />
        : <>
          {major.isError
            ? <NotFound />
            :
            <>
              <Container>
                <MajorDisplay major={((major.data?.data!) as unknown as Array<Major>)[0]} />
                <Box mt={1}>
                  <Box mr={1} display="inline-block">
                    <Button variant="contained" color="primary" className="fixright" onClick={() => history.push(`/majors/edit/${((major.data?.data!) as unknown as Array<Major>)[0].MajorCode}`)}>
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
                <DialogTitle id="delete-alert-title">Are You Sure You Want To Delete {((major.data?.data!) as unknown as Array<Major>)[0].MajorCode}?</DialogTitle>
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
                  <Button onClick={() => delMajor()} color="secondary" autoFocus>
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
export default styled(ViewMajor)`
.fixright {
  padding-right: 25px;
}
`;