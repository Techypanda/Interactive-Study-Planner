import { Box, Typography, TextField, Button, Grid } from "@material-ui/core";
import axios, { AxiosError, AxiosResponse } from "axios";
import { useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import { useHistory } from "react-router-dom";
import { BounceLoader } from "react-spinners";
import styled from "styled-components";
import Error from "../shared/Error";
import MajorList from "./MajorList";
import RequistePath from "./RequistePath";
// import DeliveryAddition from "./DeliveryAddition";
// import DeliveryList from "./DeliveryList";
// import RequistePath from "./RequistePath";

function comprehendCursedArrays(field: "UnitAntiReqs" | "SpecAntiReqs", major?: Major): Array<Array<string>> {
  let arr: Array<Array<string>> = []
  if (major) {
    arr = major[field]
  }
  return arr
}

function MajorForm(props: MajorFormProps) {
  const history = useHistory();
  const [name, setName] = useState<string | undefined>(props.major?.Name);
  const [majorCode, setMajorCode] = useState<string | undefined>(props.major?.MajorCode);
  const [description, setDescription] = useState<string | undefined>(props.major?.Description);
  const [credits, setCredits] = useState(props.major ? props.major.Credits : 0);
  const [error, setError] = useState<PromptData>({ promptTitle: "", promptContent: "", showPrompt: false });
  const [loading, setLoading] = useState(false);
  const client = useQueryClient();

  const [unitAntiReqs, setUnitAntiReqs] = useState<Array<Array<string>>>(comprehendCursedArrays("UnitAntiReqs", props.major))
  const [specAntiReqs, setSpecAntiReqs] = useState<Array<Array<string>>>(comprehendCursedArrays("SpecAntiReqs", props.major))

  const [units, setUnits] = useState<Array<string>>(props.major?.Units ? props.major?.Units : []);
  const [newUnitCode, setNewUnitCode] = useState("");

  const queryClient = useQueryClient();

  const mutation = useMutation(() => {
    const payload: CreateMajorForm = {
      name: name!,
      majorCode: majorCode!,
      description: description!,
      credits: credits! as number,
      units,
      unitAntiReqs,
      specAntiReqs
    };
    setLoading(true);
    
    if (props.major) {
      return axios.post(`${process.env.REACT_APP_UNIT_ADMIN_API}/updatemajor`, JSON.stringify(payload), {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `${client.getQueryData("token")}`
        }
      })
    } else {
      return axios.post(`${process.env.REACT_APP_UNIT_ADMIN_API}/addmajor`, JSON.stringify(payload), {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `${client.getQueryData("token")}`
        }
      })
    }
  }, {
    onMutate: () => {
    },
    onError: (error: AxiosError, variables, context) => {
      if (error.response!.status === 401) {
        client.invalidateQueries("token")
        mutation.mutate() // try again
      } else {
        setLoading(false)
        setError({ promptTitle: "Unable To Create Major", promptContent: error.response!.data, showPrompt: true })
      }
    },
    onSuccess: (data: AxiosResponse) => {
      setLoading(false)
      queryClient.invalidateQueries("majors")
      history.push('/majors')
    }
  })

  function addUnit(unitCode: string) {
    let donotadd = false;
    units.forEach((unit) => {
      if (unit.toUpperCase() === unitCode.toUpperCase()) {
        donotadd = true;
      }
    })
    if (!donotadd) {
      const copy = [...units]
      copy.push(unitCode)
      setUnits(copy);
    }
  }
  function removeUnitFromList(unitCode: string) {
    let newArr: Array<string> = []
    units.forEach((val) => {
      if (val.toUpperCase() !== unitCode.toUpperCase()) {
        newArr.push(val)
      }
    })
    setUnits(newArr)
  }

  function SubmitForm() {
    mutation.mutate();
  }

  function deleteUnitPath(idx: number) {
    const copy = [...unitAntiReqs]
    copy.splice(idx, 1)
    setUnitAntiReqs(copy)
  }
  function updateUnitPath(arr: Array<string>, idx: number) {
    const copy = [...unitAntiReqs]
    copy[idx] = arr
    setUnitAntiReqs(copy)
  }
  function deleteSpecPath(idx: number) {
    const copy = [...specAntiReqs]
    copy.splice(idx, 1)
    setSpecAntiReqs(copy)
  }
  function updateSpecPath(arr: Array<string>, idx: number) {
    const copy = [...specAntiReqs]
    copy[idx] = arr
    setSpecAntiReqs(copy)
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
        <Typography variant="h4" align="center">
          {props.major ? `Edit Major - ${props.major.Name}` : "Add Major"}
        </Typography>
      </Box>
      <Grid container spacing={1}>
        <Grid item sm={6} xs={12}>
          <Box marginTop={2}>
            <TextField error={!majorCode} label="MajorCode Of Major - Required" fullWidth placeholder="Enter Majorcode" variant="outlined" disabled={!(!props.major)} required onChange={(e) => setMajorCode(e.target.value)} value={majorCode} />
          </Box>
        </Grid>
        <Grid item sm={6} xs={12}>
          <Box marginTop={2}>
            <TextField error={!name} label="Name Of Major - Required" fullWidth placeholder="Enter Majorname" variant="outlined" required onChange={(e) => setName(e.target.value)} value={name} />
          </Box>
        </Grid>
      </Grid>
      <Grid container spacing={1}>
        <Grid item sm={6} xs={12}>
          <Box marginTop={2}>
            <TextField error={!description} label="Description Of Major - Required" fullWidth placeholder="Enter Major Description" variant="outlined" required onChange={(e) => setDescription(e.target.value)} value={description} />
          </Box>
        </Grid>
        <Grid item sm={6} xs={12}>
          <Box marginTop={2}>
            <TextField type="number" error={!credits} label="Credits In Major - Required" fullWidth placeholder="Enter Major Credits" variant="outlined" required onChange={(e) => setCredits(Number.parseFloat(e.target.value))} value={credits} />
          </Box>
        </Grid>
      </Grid>

      <Box mt={2}>
        <Typography className="bold" variant="subtitle1">Units In Major</Typography>
        <MajorList list={units} remove={removeUnitFromList} />
        <Box mt={1}>
          <TextField label="Unit Code" placeholder="Enter UnitCode To Add" variant="outlined" required onChange={(e) => setNewUnitCode(e.target.value)} value={newUnitCode} />
          <Button className="mb-1"  onClick={() => addUnit(newUnitCode)}>Add Unit</Button>
        </Box>
      </Box>

      <Box mt={2}>
        <Typography className="bold" variant="subtitle1">Unit Antirequistes</Typography>
        {unitAntiReqs.map((path, i) =>
          <Box mb={1}>
            <RequistePath idx={i} key={i} path={path} delete={deleteUnitPath} updatePath={updateUnitPath} />
          </Box>
        )}
        <Button className="mb-1"  variant="contained" color="primary" onClick={() => { const copy = [...unitAntiReqs]; copy.push([]); setUnitAntiReqs(copy) }}>Add AntiRequiste Path</Button>
      </Box>

      <Box mt={2}>
        <Typography className="bold" variant="subtitle1">Spec Antirequistes</Typography>
        {specAntiReqs.map((path, i) =>
          <Box mb={1}>
            <RequistePath idx={i} key={i} path={path} delete={deleteSpecPath} updatePath={updateSpecPath} />
          </Box>
        )}
        <Button variant="contained" color="primary" onClick={() => { const copy = [...specAntiReqs]; copy.push([]); setSpecAntiReqs(copy) }}>Add AntiRequiste Path</Button>
      </Box>

      <Box display="flex" justifyContent="space-between" mt={2}>
        <Button className="mb-1"  variant="contained" color="secondary" id="backbtn" onClick={() => history.push("/units")}>Back</Button>
        <Button
          className="mb-1" 
          variant="contained"
          color="primary"
          id="createbtn"
          onClick={() => SubmitForm()}
          disabled={!credits || !description || !name || !majorCode /* || !delivery */}
        >
          {props.major ? "Edit" : "Create"}
        </Button>
      </Box>
    </div>
  )
}
export default styled(MajorForm)`
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