import { Box, Button, Container, Dialog, Grid, TextField, Typography } from "@material-ui/core";
import axios, { AxiosError, AxiosResponse } from "axios";
import { useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import { CreateUnitForm, DefaultProps, PromptData } from "../types";
import Error from "../components/shared/Error";
import { BounceLoader } from "react-spinners";

function CreateSpecialization(props: DefaultProps) {
  const history = useHistory();
  const [name, setName] = useState("");
  const [unitCode, setUnitCode] = useState("");
  const [description, setDescription] = useState("");
  const [credits, setCredits] = useState(0);
  const [delivery, setDelivery] = useState("");
  const [corequistes, setCorequistes] = useState("");
  const [prerequistes, setPrerequistes] = useState("");
  const [antiRequistes, setAntirequistes] = useState("");
  const [error, setError] = useState<PromptData>({ promptTitle: "", promptContent: "", showPrompt: false });
  const [loading, setLoading] = useState(false);
  const client = useQueryClient();

  const mutation = useMutation(() => {
    const parsedCoreq = corequistes.split(',');
    const parsedPrereq = prerequistes.split(',');
    const pasredAntireq = antiRequistes.split(',');
    const payload: CreateUnitForm = {
      unitName: name,
      unitCode,
      unitDescription: description,
      unitCredits: Number.isNaN(credits) ? 0 : credits,
      delivery,
      corequistes: parsedCoreq,
      prerequistes: parsedPrereq,
      antirequistes: pasredAntireq
    };
    setLoading(true);
    return axios.post(`${process.env.REACT_APP_API_URI}/addunit`, JSON.stringify(payload), {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `${client.getQueryData("token")}`
      }
    })
  }, {
    onMutate: () => {
    },
    onError: (error: AxiosError, variables, context) => {
      if (error.response!.status === 401) {
        client.invalidateQueries("token")
        mutation.mutate() // try again
      } else {
        setLoading(false)
        setError({ promptTitle: "Unable To Create Specialization", promptContent: error.response!.data, showPrompt: true })
      }
    },
    onSuccess: (data: AxiosResponse) => {
      setLoading(false)
      // Need to refetch the units list
      history.push('/specialization')
    }
  })

  function SubmitForm() {
    mutation.mutate();
  }

  return (
    <Container id="createunit" className={props.className}>
      <Box className="background" display={loading ? "initial" : "none"}>
        <div className="loader">
          <BounceLoader color="#1473AB" loading={true} size={150} />
        </div>
      </Box>
      <Error onAccept={() => setError({ promptTitle: error.promptTitle, promptContent: error.promptContent, showPrompt: false })} promptTitle={error.promptTitle} promptContent={error.promptContent} showPrompt={error.showPrompt} />
      <Box marginTop={3}>
        <Typography variant="h4" align="center">Add A Specialization</Typography>
      </Box>
      <Grid container spacing={1}>
        <Grid item sm={6} xs={12}>
          <Box marginTop={2}>
            <TextField error={!unitCode} label="Unitcode Of Unit - Required" fullWidth placeholder="Enter Unitcode" variant="outlined" required onChange={(e) => setUnitCode(e.target.value)} value={unitCode} />
          </Box>
        </Grid>
        <Grid item sm={6} xs={12}>
          <Box marginTop={2}>
            <TextField error={!name} label="Name Of Unit - Required" fullWidth placeholder="Enter Unitname" variant="outlined" required onChange={(e) => setName(e.target.value)} value={name} />
          </Box>
        </Grid>
      </Grid>
      <Grid container spacing={1}>
        <Grid item sm={6} xs={12}>
          <Box marginTop={2}>
            <TextField error={!description} label="Description Of Unit - Required" fullWidth placeholder="Enter Unit Description" variant="outlined" required onChange={(e) => setDescription(e.target.value)} value={description} />
          </Box>
        </Grid>
        <Grid item sm={6} xs={12}>
          <Box marginTop={2}>
            <TextField type="number" error={!credits} label="Credits Of Unit - Required" fullWidth placeholder="Enter Unit Credits" variant="outlined" required onChange={(e) => setCredits(Number.parseFloat(e.target.value))} value={credits} />
          </Box>
        </Grid>
      </Grid>
      <Grid container spacing={1}>
        <Grid item sm={6} xs={12}>
          <Box marginTop={2}>
            <TextField error={!delivery} label="Delivery Of Unit - Required" fullWidth placeholder="Enter Delivery i.e Internal/External/Online" variant="outlined" required onChange={(e) => setDelivery(e.target.value)} value={delivery} />
          </Box>
        </Grid>
        <Grid item sm={6} xs={12}>
          <Box marginTop={2}>
            <TextField label="Prerequiste Of Unit - Optional" fullWidth placeholder="Enter Prerequiste Unit Codes as a CSV i.e COMP6001,COMP2000" variant="outlined" onChange={(e) => setPrerequistes(e.target.value)} value={prerequistes} />
          </Box>
        </Grid>
      </Grid>
      <Grid container spacing={1}>
        <Grid item sm={6} xs={12}>
          <Box marginTop={2}>
            <TextField label="Corequistes Of Unit - Optional" fullWidth placeholder="Enter Corequistes Unit Codes as a CSV i.e COMP6001,COMP2000" variant="outlined" onChange={(e) => setCorequistes(e.target.value)} value={corequistes} />
          </Box>
        </Grid>
        <Grid item sm={6} xs={12}>
          <Box marginTop={2}>
            <TextField label="Antirequistes Of Unit - Optional" fullWidth placeholder="Enter Antirequistes Unit Codes as a CSV i.e COMP6001,COMP2000" variant="outlined" onChange={(e) => setAntirequistes(e.target.value)} value={antiRequistes} />
          </Box>
        </Grid>
      </Grid>
      <Box display="flex" justifyContent="space-between" mt={2}>
        <Button variant="contained" color="secondary" id="backbtn" onClick={() => history.push("/specializations")}>Back</Button>
        <Button
          variant="contained"
          color="primary"
          id="createbtn"
          onClick={() => SubmitForm()}
          disabled={!credits || !delivery || !description || !name || !unitCode}
        >
          Create
        </Button>
      </Box>
    </Container>
  )
}

export default styled(CreateSpecialization)`
.background {
  width: 100vw;
  height: 100vh;
  position: absolute;
  background-color: rgba(0,0,0,0.25);
  top: 0;
  left: 0;
  z-index: 99;
}
.loader {
  top: 50%;
  left: 50%;
  position: absolute;
  transform: translate(-75px, -75px);
}
`;