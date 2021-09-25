import { Box, Typography, TextField, Button, Grid, FormControlLabel, Checkbox } from "@material-ui/core";
import axios, { AxiosError, AxiosResponse } from "axios";
import { useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import { useHistory } from "react-router-dom";
import { BounceLoader } from "react-spinners";
import styled from "styled-components";
import Error from "../shared/Error";
import MajorList from "../majors/MajorList";
import RequistePath from "../majors/RequistePath";
// import DeliveryAddition from "./DeliveryAddition";
// import DeliveryList from "./DeliveryList";
// import RequistePath from "./RequistePath";

function comprehendCursedArrays(field: "UnitAntiReqs" | "SpecAntiReqs" | "MajorAntiReqs", spec?: Specialization): Array<Array<string>> {
  let arr: Array<Array<string>> = []
  if (spec) {
    arr = spec[field]
  }
  return arr
}
function SpecForm(props: SpecFormProps) {
  const history = useHistory();
  const [name, setName] = useState<string | undefined>(props.spec?.Name);
  const [specCode, setSpecCode] = useState<string | undefined>(props.spec?.SpecializationCode);
  const [description, setDescription] = useState<string | undefined>(props.spec?.Description);
  const [credits, setCredits] = useState(props.spec ? props.spec.Credits : 0);
  const [internal, setInternal] = useState(props.spec?.Internal)

  const [error, setError] = useState<PromptData>({ promptTitle: "", promptContent: "", showPrompt: false });
  const [loading, setLoading] = useState(false);
  const client = useQueryClient();

  const [unitAntiReqs, setUnitAntiReqs] = useState<Array<Array<string>>>(comprehendCursedArrays("UnitAntiReqs", props.spec))
  const [specAntiReqs, setSpecAntiReqs] = useState<Array<Array<string>>>(comprehendCursedArrays("SpecAntiReqs", props.spec))
  const [majorAntiReqs, setMajorAntiReqs] = useState<Array<Array<string>>>(comprehendCursedArrays("MajorAntiReqs", props.spec))

  const [units, setUnits] = useState<Array<string>>(props.spec?.Units ? props.spec?.Units : []);
  const [newUnitCode, setNewUnitCode] = useState("");

  const queryClient = useQueryClient();

  const mutation = useMutation(() => {
    const payload: CreateSpecForm = {
      SpecCode: specCode!,
      Name: name!,
      Description: description!,
      Credits: credits,
      CourseInternal: internal!,
      Units: units,
      UnitAntiReqs: unitAntiReqs,
      SpecAntiReqs: specAntiReqs,
      MajorAntiReqs: majorAntiReqs
    };
    setLoading(true);

    if (props.spec) {
      return axios.post(`${process.env.REACT_APP_UNIT_ADMIN_API}/updatespec`, JSON.stringify(payload), {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `${client.getQueryData("token")}`
        }
      })
    } else {
      return axios.post(`${process.env.REACT_APP_UNIT_ADMIN_API}/addspec`, JSON.stringify(payload), {
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
        setError({ promptTitle: "Unable To Create Specialization", promptContent: error.response!.data, showPrompt: true })
      }
    },
    onSuccess: (data: AxiosResponse) => {
      setLoading(false)
      queryClient.invalidateQueries("specs")
      history.push('/specializations')
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
  function deleteMajorPath(idx: number) {
    const copy = [...majorAntiReqs]
    copy.splice(idx, 1)
    setMajorAntiReqs(copy)
  }
  function updateMajorPath(arr: Array<string>, idx: number) {
    const copy = [...majorAntiReqs]
    copy[idx] = arr
    setMajorAntiReqs(copy)
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
          {props.spec ? `Edit Specialization - ${props.spec?.Name}` : "Create Specialization"}
        </Typography>
      </Box>
      <Grid container spacing={1}>
        <Grid item sm={6} xs={12}>
          <Box marginTop={2}>
            <TextField error={!specCode} label="SpecCode Of Spec - Required" fullWidth placeholder="Enter Speccode" variant="outlined" disabled={!(!props.spec)} required onChange={(e) => setSpecCode(e.target.value)} value={specCode} />
          </Box>
        </Grid>
        <Grid item sm={6} xs={12}>
          <Box marginTop={2}>
            <TextField error={!name} label="Name Of Spec - Required" fullWidth placeholder="Enter Specname" variant="outlined" required onChange={(e) => setName(e.target.value)} value={name} />
          </Box>
        </Grid>
      </Grid>
      <Grid container spacing={1}>
        <Grid item sm={6} xs={12}>
          <Box marginTop={2}>
            <TextField error={!description} label="Description Of Spec - Required" fullWidth placeholder="Enter Spec Description" variant="outlined" required onChange={(e) => setDescription(e.target.value)} value={description} />
          </Box>
        </Grid>
        <Grid item sm={6} xs={12}>
          <Box marginTop={2}>
            <TextField type="number" error={!credits} label="Credits In Spec - Required" fullWidth placeholder="Enter Spec Credits" variant="outlined" required onChange={(e) => setCredits(Number.parseFloat(e.target.value))} value={credits} />
          </Box>
        </Grid>
      </Grid>
      <Grid container spacing={1}>
        <Grid item sm={6} xs={12}>
          <Box marginTop={2}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={internal}
                  onChange={(e) => setInternal(e.target.checked)}
                  name="isinternal"
                  color="primary"
                />
              }
              label="Is Specialization Internal"
            />
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
        <Button className="mb-1"  variant="contained" color="primary" onClick={() => { const copy = [...specAntiReqs]; copy.push([]); setSpecAntiReqs(copy) }}>Add AntiRequiste Path</Button>
      </Box>

      <Box mt={2}>
        <Typography className="bold" variant="subtitle1">Major Antirequistes</Typography>
        {majorAntiReqs.map((path, i) =>
          <Box mb={1}>
            <RequistePath idx={i} key={i} path={path} delete={deleteMajorPath} updatePath={updateMajorPath} />
          </Box>
        )}
        <Button className="mb-1"  variant="contained" color="primary" onClick={() => { const copy = [...majorAntiReqs]; copy.push([]); setMajorAntiReqs(copy) }}>Add AntiRequiste Path</Button>
      </Box>

      <Box display="flex" justifyContent="space-between" mt={2}>
        <Button className="mb-1"  variant="contained" color="secondary" id="backbtn" onClick={() => history.push("/units")}>Back</Button>
        <Button
          className="mb-1"
          variant="contained"
          color="primary"
          id="createbtn"
          onClick={() => SubmitForm()}
          disabled={!credits || !description || !name || !specCode /* || !delivery */}
        >
          {props.spec ? "Edit" : "Create"}
        </Button>
      </Box>
    </div>
  )
}
export default styled(SpecForm)`
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