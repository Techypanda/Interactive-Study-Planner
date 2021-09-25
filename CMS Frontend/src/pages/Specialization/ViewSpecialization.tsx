import { Box, Button, Container, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, LinearProgress } from "@material-ui/core";
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import axios, { AxiosError } from "axios";
import { useState } from "react";
import { useQueryClient } from "react-query";
import { useHistory, useParams } from "react-router-dom";
import styled from "styled-components";
import { useSpecialization } from "../../api/hooks";
import SpecializationDisplay from "../../components/specialization/SpecializationDisplay";
import NotFound from "../NotFound";

function ViewSpecialization(props: DefaultProps) {
  const { SpecCode } = useParams<{ SpecCode: string }>();
  const spec = useSpecialization(SpecCode)
  const [displayDel, setDisplayDel] = useState(false);
  const history = useHistory();
  const client = useQueryClient();
  const [loading, setLoading] = useState(false);

  function delSpec() {
    setDisplayDel(false);
    setLoading(true);
    axios.post(`${process.env.REACT_APP_UNIT_ADMIN_API}/deletespec`, {
      specCode: ((spec.data?.data!) as unknown as Array<Specialization>)[0].SpecializationCode // max made the get return a array
    }, { headers: { 'Authorization': client.getQueryData("token") } }).then(() => {
      setLoading(false);
      client.removeQueries("specs")
      history.push("/specializations")
    }).catch((err) => {
      const tmp = err as AxiosError
      setLoading(false);
      alert(tmp.response?.data)
    })
  }
  return (
    <div className={props.className}>
      {(spec.isLoading || loading)
        ? <LinearProgress />
        : <>
          {spec.isError
            ? <NotFound />
            :
            <>
              <Container>
                <SpecializationDisplay spec={((spec.data?.data!) as unknown as Array<Specialization>)[0]} />
                <Box mt={1}>
                  <Box mr={1} display="inline-block">
                    <Button variant="contained" color="primary" className="fixright mb-1" onClick={() => history.push(`/specializations/edit/${((spec.data?.data!) as unknown as Array<Specialization>)[0].SpecializationCode}`)}>
                      <EditIcon /> - Edit
                    </Button>
                  </Box>
                  <Button variant="contained" color="secondary" className="fixright mb-1" onClick={() => setDisplayDel(true)}>
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
                <DialogTitle id="delete-alert-title">Are You Sure You Want To Delete {((spec.data?.data!) as unknown as Array<Specialization>)[0].SpecializationCode}?</DialogTitle>
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
                  <Button onClick={() => delSpec()} color="secondary" autoFocus>
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
export default styled(ViewSpecialization)`
.fixright {
  padding-right: 25px;
}
`;