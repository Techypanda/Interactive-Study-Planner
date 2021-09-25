import { Box, Grid } from "@material-ui/core";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { Career, Major, Specialization, Unit, UnitFirstSPAContextProps } from "../../types";
import CareerList from "./CareerList";
import Initial from "./Initial";
import PlanList from "./PlanList";
import Workspace from "./Workspace";

enum UNITSFIRSTMODES {
  initial,
  workspace
}

function UnitsFirstSPAContext(props: UnitFirstSPAContextProps) {
  const [stage, setStage] = useState<UNITSFIRSTMODES>(UNITSFIRSTMODES.initial)
  const [careers, setCareers] = useState<Array<Career>>(props.careers);
  const [units, setUnits] = useState<Array<Unit>>(props.units);
  const [majors, setMajors] = useState<Array<Major>>(props.majors);
  const [specs, setSpecs] = useState<Array<Specialization>>(props.specs);
  const [myKnapsack, setMyKnapsack] = useState<Array<any>>([]);
  function selectMajor(major: Major) {
    const currKnapsack = [...myKnapsack!]
    currKnapsack.push(major);
    setMyKnapsack(currKnapsack);
    setStage(UNITSFIRSTMODES.workspace);
  }
  useEffect(() => { // runs every time knapsack changes or on load
    console.log('knapsack changed')
  }, [myKnapsack])
  return (
    <Box>
      <Grid container className="sameheight"> { /* this isnt going to work on mobile :/ */}
        <Grid item xs={2} className="sameheight">
          <PlanList />
        </Grid>
        <Grid item xs={8} className="sameheight">
          {stage === UNITSFIRSTMODES.initial ? <Initial majors={majors} selectMajor={selectMajor} />
            : stage === UNITSFIRSTMODES.workspace ? <Workspace />
            : <h1>Unknown Stage</h1>
          }
        </Grid>
        <Grid item xs={2} className="sameheight">
          <CareerList careers={careers} />
        </Grid>
      </Grid>
    </Box >
  )
}
export default styled(UnitsFirstSPAContext)`
      `;