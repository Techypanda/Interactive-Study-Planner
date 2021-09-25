import { Box, Grid } from "@material-ui/core";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { Career, Major, Plan, Specialization, Unit, UnitFirstSPAContextProps } from "../../types";
import CareerList from "./CareerList";
import Initial from "./Initial";
import PlanList from "./PlanList";
import Workspace from "./Workspace";

enum UNITSFIRSTMODES {
  initial,
  workspace,
  fullWorkspace
}

function UnitsFirstSPAContext(props: UnitFirstSPAContextProps) {
  const [stage, setStage] = useState<UNITSFIRSTMODES>(UNITSFIRSTMODES.initial)
  const [careers, setCareers] = useState<Array<Career>>(props.careers);
  const [units, setUnits] = useState<Array<Unit>>(props.units);
  const [majors, setMajors] = useState<Array<Major>>(props.majors);
  const [specs, setSpecs] = useState<Array<Specialization>>(props.specs);
  const [mainMajor, setMMajor] = useState<Major>();
  const [plan, setPlan] = useState<Plan>({});
  function removeFromPlan(i: Major | Unit | Specialization) {
    const temp = { ...plan };
    if ('UnitCode' in i) {
      let idx = -1;
      temp.optionalUnits?.forEach((u, z) => {
        if (u.UnitCode === i.UnitCode) {
          idx = z
        }
      })
      if (idx === -1) {
        alert("FATAL EXCEPTION: Somehow I am removing a unit that isnt in my bag!"); // do something here I have no idea what to do if you reach here
      } else {
        temp.optionalUnits?.splice(idx, 1);
        setPlan(temp);
      }
    } else if ('MajorCode' in i) {
      temp.doubleMajor = undefined;
      setPlan(temp);
    } else {
      const sp = i as Specialization;
      let idx = -1;
      temp.specializations?.forEach((k, p) => {
        if (k.SpecializationCode === sp.SpecializationCode) {
          idx = p;
        }
      })
      if (idx === -1) {
        alert("FATAL EXCEPTION: Somehow I am removing a specialization that isnt in my bag!"); // do something here I have no idea what to do if you reach here
      } else {
        temp.specializations?.splice(idx, 1);
        setPlan(temp);
      }
    }
  }
  function setMainMajor(major: Major) {
    const temp = { ...plan };
    if (temp.doubleMajor && temp.doubleMajor.MajorCode === major.MajorCode) {
      alert("you cant select a major as your main that you have as your secondary"); // switch to a material ui prompt
    } else {
      setMMajor(major);
      temp.mainMajor = major;
      setPlan(temp);
      setStage(UNITSFIRSTMODES.workspace);
    }
  }
  function select(s: Unit | Major | Specialization) {
    const temp = { ...plan };
    if ('UnitCode' in s) {
      const unit = s as Unit
      if (temp.optionalUnits) {
        if (temp.optionalUnits.length === 4) {
          alert("You can't have more than 4 optional units") // switch to a material ui prompt
        } else {
          let EXISTSINOPTIONALUNITS = false;
          temp.optionalUnits.forEach((u) => {
            if (u.UnitCode === unit.UnitCode) {
              EXISTSINOPTIONALUNITS = true;
            }
          })
          if (EXISTSINOPTIONALUNITS) {
            alert("You cannot take a optional unit twice."); // switch to a material ui prompt
          } else {
            if (temp.specializations && temp.specializations.length > 0 && !(temp.specializations[0].Internal)) {
              alert("You cannot take a external specialization and optional units") // switch to a material ui prompt
            } else {
              temp.optionalUnits.push(unit);
              setPlan(temp);
            }
          }
        }
      } else {
        let EXISTSINMAJOR = false;
        temp.mainMajor?.Units.forEach((u) => {
          if (u === unit.UnitCode) {
            EXISTSINMAJOR = true;
          }
        })
        if (EXISTSINMAJOR) {
          alert("You are already taking this unit in your main major") // switch to a material ui prompt
        } else {
          if (temp.specializations && temp.specializations.length > 0 && !(temp.specializations[0].Internal)) {
            alert("You cannot take a external specialization and optional units") // switch to a material ui prompt
          } else {
            temp.optionalUnits = [unit];
            setPlan(temp);
          }
        }
      }
    } else if ('MajorCode' in s) { // TODO: When you add a major, if a optional unit exists that is in the major, remove the optional unit as they now can select another optional unit
      const major = s as Major
      if (temp.optionalUnits && temp.optionalUnits.length > 0) {
        alert("You can't have optional units and a double major."); // switch to a material ui prompt
      }
      else if (temp.specializations && temp.specializations.length > 0) {
        alert("You can't have specializations and a double major."); // switch to a material ui prompt
      }
      else if (temp.mainMajor?.MajorCode === major.MajorCode) {
        alert("You can't select the same double major as your main major"); // switch to a material ui prompt
      }
      else {
        temp.doubleMajor = major;
        setPlan(temp);
      }
    } else {
      const spec = s as Specialization
      if (temp.optionalUnits && temp.optionalUnits.length > 0 && !spec.Internal) {
        alert("You cannot take optional units and a external spec"); // switch to a material ui prompt
      } else if (temp.specializations && temp.specializations.length > 0) {
        if (spec.Internal) {
          if (temp.specializations.length > 0 && temp.specializations[0].SpecializationCode === spec.SpecializationCode) {
            alert("You already have this specialization in your plan"); // switch to a material ui prompt
          } else {
            temp.specializations.push(spec);
            setPlan(temp);
          }
        } else {
          if (temp.specializations.length > 0 && temp.specializations[0].Internal) {
            if (temp.specializations[0].SpecializationCode === spec.SpecializationCode) {
              alert("You already have this specialization in your plan"); // switch to a material ui prompt
            } else {
              temp.specializations.push(spec);
              setPlan(temp);
            }
          } else {
            alert("You cannot have two external specializations"); // switch to a material ui prompt
          }
        }
      } else {
        temp.specializations = [spec];
        setPlan(temp);
      }
    }
  }
  useEffect(() => { // everytime plan is updated, check if you have a full knapsack
    if (plan.mainMajor && plan.doubleMajor) { // victory paths.
      setStage(UNITSFIRSTMODES.fullWorkspace);
    } else if (plan.specializations && plan.specializations.length === 2) {
      setStage(UNITSFIRSTMODES.fullWorkspace);
    } if (plan.optionalUnits && plan.specializations && plan.optionalUnits.length === 4 && plan.specializations.length === 1) {
      setStage(UNITSFIRSTMODES.fullWorkspace);
    } else {
      if (stage === UNITSFIRSTMODES.fullWorkspace) { // its no longer full so direct back
        setStage(UNITSFIRSTMODES.workspace);
      }
    }
  }, [plan, stage]);
  return (
    <Box>
      <Grid container className="sameheight"> { /* this isnt going to work on mobile :/ */}
        <Grid item xs={2} className="sameheight">
          <PlanList
            plan={plan}
            mainMajor={mainMajor}
            majors={majors}
            updateMainMajor={setMainMajor}
            removeFromPlan={removeFromPlan}
          />
        </Grid>
        <Grid item xs={8} className="sameheight">
          {stage === UNITSFIRSTMODES.initial ? <Initial majors={majors} selectMajor={setMainMajor} />
            : stage === UNITSFIRSTMODES.workspace ? <Workspace majors={majors} units={units} specs={specs} select={select} />
              : stage === UNITSFIRSTMODES.fullWorkspace ? <h1>Your plan is now full</h1>
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