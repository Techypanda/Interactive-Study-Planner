import { Box, Button, Container, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, LinearProgress } from "@material-ui/core";
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import axios, { AxiosError } from "axios";
import { useState } from "react";
import { useQueryClient } from "react-query";
import { useHistory, useParams } from "react-router-dom";
import styled from "styled-components";
import { useCareer } from "../../api/hooks";
import CareerDisplay from "../../components/careers/CareerDisplay";
import NotFound from "../NotFound";

function ViewCareer(props: DefaultProps) {
  const { CareerId } = useParams<{ CareerId: string }>();
  const career = useCareer(CareerId)
  const [displayDel, setDisplayDel] = useState(false);
  const history = useHistory();
  const client = useQueryClient();
  const [loading, setLoading] = useState(false);
  function delCareer() {
    setDisplayDel(false);
    setLoading(true);
    axios.post(`${process.env.REACT_APP_CAREER_ADMIN_API}/deletecareer`, JSON.stringify({
      CareerId: ((career.data?.data as any)?.Item?.CareerId)
    }), { headers: { 'Authorization': client.getQueryData("token") } }).then(() => {
      setLoading(false);
      client.removeQueries("careers")
      history.push("/careers")
    }).catch((err) => {
      const tmp = err as AxiosError
      setLoading(false);
      alert(tmp.response?.data)
    })
  }
  return (
    <div className={props.className}>
      {(career.isLoading || loading)
        ? <LinearProgress />
        : <>
          {career.isError
            ? <NotFound />
            :
            <>
              <Container>
                <CareerDisplay career={((career.data?.data! as any).Item as Career)} />
                <Box mt={1}>
                  <Box mr={1} display="inline-block">
                    <Button variant="contained" color="primary" className="fixright" onClick={() => history.push(`/careers/edit/${((career.data?.data! as any).Item as Career).CareerId}`)}>
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
                <DialogTitle id="delete-alert-title">Are You Sure You Want To Delete {((career.data?.data! as any).Item as Career).CareerId}?</DialogTitle> {/* API returns a wrapper for some reason zzz */}
                <DialogContent>
                  <DialogContentText id="delete-alert-description">
                    Are you sure you want to permanently delete this career?<br />
                    There is no way to get this data back.
                  </DialogContentText>
                </DialogContent>
                <DialogActions>
                  <Button onClick={() => setDisplayDel(false)} color="primary">
                    Nevermind
                  </Button>
                  <Button onClick={() => delCareer()} color="secondary" autoFocus>
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
export default styled(ViewCareer)`
.fixright {
  padding-right: 25px;
}
`;