import { Box, Button, Grid, TextField, Typography } from "@material-ui/core";
import axios, { AxiosError, AxiosResponse } from "axios";
import { useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import { useHistory } from "react-router-dom";
import { BounceLoader } from "react-spinners";
import styled from "styled-components";
import Error from "../shared/Error";
import CareerList from "./CareerList";

function CareerForm(props: CareerFormProps) {
  const history = useHistory();
  const client = useQueryClient();
  const [careerTitle, setCareerTitle] = useState(props.career?.Name ? props.career.Name : "");
  const [careerIndustry, setCareerIndustry] = useState(props.career?.Industry ? props.career.Industry : "");
  const [careerDesc, setCareerDesc] = useState(props.career?.Description ? props.career.Description : "");
  const [newReq, setNewReq] = useState("");
  const [newTrait, setNewTrait] = useState("");
  const [requirements, setRequirements] = useState<Array<string>>(props.career?.Requirements ? props.career?.Requirements : []);
  const [traits, setTraits] = useState<Array<string>>(props.career?.Traits ? props.career?.Traits : []);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<PromptData>({ promptTitle: "", promptContent: "", showPrompt: false });

  function uuidv4() { // https://stackoverflow.com/questions/105034/how-to-create-a-guid-uuid
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      // eslint-disable-next-line no-mixed-operators
      var r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }

  const mutation = useMutation(() => {
    setLoading(true);
    const payload = {
      CareerId: uuidv4(),
      Name: careerTitle,
      Description: careerDesc,
      Industry: careerIndustry,
      Requirements: requirements,
      Traits: traits
    }
    if (props.career) {
      payload['CareerId'] = props.career?.CareerId;
      return axios.post(`${process.env.REACT_APP_CAREER_ADMIN_API}/updatecareer`, JSON.stringify(payload), {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `${client.getQueryData("token")}`
        }
      })
    } else {
      return axios.post(`${process.env.REACT_APP_CAREER_ADMIN_API}/addcareer`, JSON.stringify(payload), {
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
        setError({ promptTitle: "Unable To Create Career", promptContent: error.response!.data, showPrompt: true })
      }
    },
    onSuccess: (data: AxiosResponse) => {
      setLoading(false)
      client.invalidateQueries("careers")
      client.invalidateQueries(`career - ${props.career?.CareerId}`)
      history.push('/careers')
    }
  })

  function addReq(req: string) {
    let donotadd = false;
    requirements.forEach((r) => {
      if (r.toUpperCase() === req.toUpperCase()) {
        donotadd = true;
      }
    })
    if (!donotadd) {
      const copy = [...requirements]
      copy.push(req)
      setRequirements(copy);
    }
  }
  function removeReq(req: string) {
    let newArr: Array<string> = []
    requirements.forEach((val) => {
      if (val.toUpperCase() !== req.toUpperCase()) {
        newArr.push(val)
      }
    })
    setRequirements(newArr)
  }
  function addTrait(t: string) {
    let donotadd = false;
    traits.forEach((z) => {
      if (z.toUpperCase() === t.toUpperCase()) {
        donotadd = true;
      }
    })
    if (!donotadd) {
      const copy = [...traits]
      copy.push(t)
      setTraits(copy);
    }
  }
  function removeTrait(t: string) {
    let newArr: Array<string> = []
    traits.forEach((val) => {
      if (val.toUpperCase() !== t.toUpperCase()) {
        newArr.push(val)
      }
    })
    setTraits(newArr)
  }
  function SubmitForm() {
    mutation.mutate();
  }
  return (
    <div className={props.className}>
      <Box className="background" display={loading ? "initial" : "none"}>
        <div className="loader">
          <BounceLoader color="#1473AB" loading={true} size={150} />
        </div>
      </Box>
      <Error onAccept={() => setError({ promptTitle: error.promptTitle, promptContent: error.promptContent, showPrompt: false })} promptTitle={error.promptTitle} promptContent={error.promptContent} showPrompt={error.showPrompt} />
      <Box mt={3} mb={2}>
        <Typography variant="h4" align="center">Add A Career</Typography>
      </Box>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <TextField variant="outlined" label="Enter Career's Title" required fullWidth value={careerTitle} onChange={(e) => setCareerTitle(e.target.value)} />
        </Grid>
        <Grid item xs={6}>
          <TextField variant="outlined" label="Enter Career's Industry e.g. 'Chemistry'" required fullWidth value={careerIndustry} onChange={(e) => setCareerIndustry(e.target.value)} />
        </Grid>
      </Grid>
      <Box mt={2}>
        <TextField className="CareerDesc" fullWidth multiline label="Enter Career's Description" required variant="outlined" value={careerDesc} onChange={(e) => setCareerDesc(e.target.value)} />
      </Box>
      <Box mt={2}>
        <Typography className="bold" variant="subtitle1">Requirements In Career</Typography>
        <CareerList list={requirements} remove={removeReq} />
        <Box mt={1}>
          <TextField label="Career Requirement" placeholder="Enter Requirement To Add" variant="outlined" required onChange={(e) => setNewReq(e.target.value)} value={newReq} />
          <Button onClick={() => addReq(newReq)}>Add Unit</Button>
        </Box>
      </Box>
      <Box mt={2}>
        <Typography className="bold" variant="subtitle1">Traits In Career</Typography>
        <CareerList list={traits} remove={removeTrait} />
        <Box mt={1}>
          <TextField label="Career Traits" placeholder="Enter Trait To Add" variant="outlined" required onChange={(e) => setNewTrait(e.target.value)} value={newTrait} />
          <Button onClick={() => addTrait(newTrait)}>Add Trait</Button>
        </Box>
      </Box>
      <Box mt={3} display="flex" justifyContent="space-between">
        <Button variant="contained" color="secondary" onClick={() => history.goBack()}>Back</Button>
        <Button variant="contained" color="primary" onClick={() => SubmitForm()}>Create Career</Button>
      </Box>
    </div>
  )
}

export default styled(CareerForm)`
.CareerDesc textarea {
  min-height: 250px;
}
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