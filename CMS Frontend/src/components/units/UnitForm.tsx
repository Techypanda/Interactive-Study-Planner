import { Box, Typography, TextField, Button, Grid, MenuItem, Select, Fab, Chip, Paper } from "@material-ui/core";
import { Add, PlusOne } from "@material-ui/icons";
import axios, { AxiosError, AxiosResponse } from "axios";
import { useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import { useHistory } from "react-router-dom";
import { BounceLoader } from "react-spinners";
import styled from "styled-components";
import Error from "../shared/Error";
import DeliveryAddition from "./DeliveryAddition";
import DeliveryList from "./DeliveryList";
import RequistePath from "./RequistePath";

function UnitForm(props: UnitFormProps) {
  const history = useHistory();
  const [name, setName] = useState<string | undefined>(props.unit?.Name);
  const [unitCode, setUnitCode] = useState<string | undefined>(props.unit?.UnitCode);
  const [description, setDescription] = useState<string | undefined>(props.unit?.Description);
  const [credits, setCredits] = useState(props.unit ? props.unit.Credits : 0);
  const [corequistes, setCorequistes] = useState("");
  const [prerequistes, setPrerequistes] = useState("");
  const [antiRequistes, setAntirequistes] = useState("");
  const [error, setError] = useState<PromptData>({ promptTitle: "", promptContent: "", showPrompt: false });
  const [loading, setLoading] = useState(false);
  const client = useQueryClient();

  const [prereq, setPrereq] = useState<Array<Array<string>>>([])
  const [coreq, setCoreq] = useState<Array<Array<string>>>([])
  const [antireq, setAntireq] = useState<Array<Array<string>>>([])

  const [deliverys, setDeliverys] = useState<Array<string>>(props.unit?.Delivery ? props.unit?.Delivery.split(",") : []);

  const mutation = useMutation(() => {
    const parsedCoreq = corequistes.split(',');
    const parsedPrereq = prerequistes.split(',');
    const pasredAntireq = antiRequistes.split(',');
    const payload: CreateUnitForm = {
      unitName: name!,
      unitCode: unitCode!,
      unitDescription: description!,
      unitCredits: Number.isNaN(credits) ? 0 : credits as number,
      delivery: "",
      // delivery: delivery!,
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
        setError({ promptTitle: "Unable To Create Unit", promptContent: error.response!.data, showPrompt: true })
      }
    },
    onSuccess: (data: AxiosResponse) => {
      setLoading(false)
      // Need to refetch the units list
      history.push('/units')
    }
  })

  function addDelivery(delivery: "Online" | "Internal") {
    let donotadd = false;
    deliverys.forEach((del) => {
      if (del.toUpperCase() === delivery.toUpperCase()) {
        donotadd = true;
      }
    })
    if (!donotadd) {
      const copy = [...deliverys]
      copy.push(delivery)
      setDeliverys(copy);
    }
  }
  function removeDelivery(delivery: string) {
    let newArr: Array<string> = []
    deliverys.forEach((val) => {
      if (val.toUpperCase() !== delivery.toUpperCase()) {
        newArr.push(val)
      }
    })
    setDeliverys(newArr)
  }

  function SubmitForm() {
    mutation.mutate();
  }

  function deletePrePath(idx: number) {
    const copy = [...prereq]
    copy.splice(idx, 1)
    setPrereq(copy)
  }
  function updatePrePath(arr: Array<string>, idx: number) {
    const copy = [...prereq]
    copy[idx] = arr;
    setPrereq(copy);
  }
  function deleteCoPath(idx: number) {
    const copy = [...coreq]
    copy.splice(idx, 1)
    setCoreq(copy)
  }
  function updateCoPath(arr: Array<string>, idx: number) {
    const copy = [...coreq]
    copy[idx] = arr;
    setCoreq(copy);
  }
  function deleteAntiPath(idx: number) {
    const copy = [...prereq]
    copy.splice(idx, 1)
    setAntireq(copy)
  }
  function updateAntiPath(arr: Array<string>, idx: number) {
    const copy = [...prereq]
    copy[idx] = arr;
    setAntireq(copy);
  }

  return (
    <div className={props.className}>
      <Box className="background" display={loading ? "initial" : "none"}>
        <div className="loader">
          <BounceLoader color="#1473AB" loading={true} size={150} />
        </div>
      </Box>
      <Error onAccept={() => setError({ promptTitle: error.promptTitle, promptContent: error.promptContent, showPrompt: false })} promptTitle={error.promptTitle} promptContent={error.promptContent} showPrompt={error.showPrompt} />
      <Box marginTop={3}>
        <Typography variant="h4" align="center">Add A Unit</Typography>
      </Box>
      <Grid container spacing={1}>
        <Grid item sm={6} xs={12}>
          <Box marginTop={2}>
            <TextField error={!unitCode} label="Unitcode Of Unit - Required" fullWidth placeholder="Enter Unitcode" variant="outlined" disabled={!(!props.unit)} required onChange={(e) => setUnitCode(e.target.value)} value={unitCode} />
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

      <Box mt={2}>
        <Typography className="bold" variant="subtitle1">Delivery Of Unit</Typography>
        <DeliveryList list={deliverys} remove={removeDelivery} />
        <Box mt={1}>
          <DeliveryAddition add={addDelivery} />
        </Box>
      </Box>

      <Box mt={2}>
        <Typography className="bold" variant="subtitle1">Prerequistes</Typography>
        {prereq.map((path, i) =>
          <Box mb={1}>
            <RequistePath idx={i} key={i} path={path} delete={deletePrePath} updatePath={updatePrePath} />
          </Box>
        )}
        <Button variant="contained" color="primary" onClick={() => { const copy = [...prereq]; copy.push([]); setPrereq(copy) }}>Add Requiste Path</Button>
      </Box>

      <Box mt={2}>
        <Typography className="bold" variant="subtitle1">Corequistes</Typography>
        {coreq.map((path, i) =>
          <Box mb={1}>
            <RequistePath idx={i} key={i} path={path} delete={deleteCoPath} updatePath={updateCoPath} />
          </Box>
        )}
        <Button variant="contained" color="primary" onClick={() => { const copy = [...coreq]; copy.push([]); setCoreq(copy) }}>Add Requiste Path</Button>
      </Box>

      <Box mt={2}>
        <Typography className="bold" variant="subtitle1">Antirequistes</Typography>
        {antireq.map((path, i) =>
          <Box mb={1}>
            <RequistePath idx={i} key={i} path={path} delete={deleteAntiPath} updatePath={updateAntiPath} />
          </Box>
        )}
        <Button variant="contained" color="primary" onClick={() => { const copy = [...antireq]; copy.push([]); setAntireq(copy) }}>Add Requiste Path</Button>
      </Box>

      <Box display="flex" justifyContent="space-between" mt={2}>
        <Button variant="contained" color="secondary" id="backbtn" onClick={() => history.push("/units")}>Back</Button>
        <Button
          variant="contained"
          color="primary"
          id="createbtn"
          onClick={() => SubmitForm()}
          disabled={!credits || !description || !name || !unitCode /* || !delivery */}
        >
          Create
        </Button>
      </Box>
    </div>
  )
}
export default styled(UnitForm)`
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
.bold {
  font-weight: 600;
}
`;