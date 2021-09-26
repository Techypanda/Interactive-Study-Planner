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

const HARD_CODED_FIRSTYEAR_UNITS = [ // These are required in first year for medical degree
  "MEDI1000", "HUMB1000", "BIOL1004", "CHEM1007", "INDH1006", "EPID1000", "HUMB1001", "GENE1000"
]

// Check that specialization does not have a unit antireq path that is satisifed by unit array
function specAntireqsCheckUnits(spec: Specialization, myUnits: Unit[]): [boolean, Unit[]?] {
  let retVal: [boolean, Unit[]?] = [false, undefined];
  spec.UnitAntiReqs.forEach((path) => {
    const pathMet: Unit[] = [];
    path.forEach((uCode) => {
      myUnits.forEach((unit) => {
        if (uCode === unit.UnitCode) {
          pathMet.push(unit);
        }
      })
    })
    if (path.length === pathMet.length) {
      retVal = [true, pathMet];
    }
  })
  return retVal;
}

function specAntireqsCheckMajor(spec: Specialization, major: Major): boolean {
  let retVal = false;
  spec.MajorAntiReqs.forEach((path) => {
    path.forEach((m) => {
      if (m === major.MajorCode) {
        retVal = true;
      }
    })
  })
  return retVal;
}

function checkUnitInMajor(major: Major, unit: Unit): boolean {
  let retVal = false;
  major.Units.forEach((u) => {
    if (u === unit.UnitCode) {
      retVal = true;
    }
  })
  // Check against hardcoded units too
  HARD_CODED_FIRSTYEAR_UNITS.forEach((u) => {
    if (u === unit.UnitCode) {
      retVal = true;
    }
  })
  return retVal;
}

function checkIfHavePrereqs(unitsIAmTaking: string[], unit: Unit): [boolean, string[][]?] {
  let retVal: [boolean, string[][]?] = [false, []];
  if (unit.Prerequistes.length >= 1 && unit.Prerequistes[0].length >= 1 && unit.Prerequistes[0][0] !== "") {
    retVal[0] = true;
    unit.Prerequistes.forEach((path) => {
      let pathMet: string[] = [];
      path.forEach((i) => {
        unitsIAmTaking.forEach((k) => {
          if (i === k) {
            pathMet.push(k);
          }
        })
      })
      if (pathMet.length === path.length && pathMet[0] !== "") {
        retVal[0] = false;
      } else {
        retVal[1]?.push(path);
      }
    })
  }
  return retVal;
}

function checkIfHaveAntireqs(unitsIAmTaking: string[], unit: Unit): [boolean, string[]?] {
  let retVal: [boolean, string[]?] = [false, undefined];
  if (unit.Antirequistes.length >= 1 && unit.Antirequistes[0].length >= 1 && unit.Antirequistes[0][0] !== "") {
    unit.Antirequistes.forEach((path) => {
      let pathMet: string[] = [];
      path.forEach((i) => {
        unitsIAmTaking.forEach((k) => {
          if (i === k) {
            pathMet.push(k);
          }
        })
      })
      if (pathMet.length === path.length && pathMet[0] !== "") {
        retVal = [true, path]
      }
    })
  }
  return retVal;
}

// TODO SORT THE PAGES ALPHABETICALLY
function UnitsFirstSPAContext(props: UnitFirstSPAContextProps) {
  const [stage, setStage] = useState<UNITSFIRSTMODES>(UNITSFIRSTMODES.initial)
  const [careers, setCareers] = useState<Array<Career>>(props.careers);
  const [units, setUnits] = useState<Array<Unit>>(props.units);
  const [majors, setMajors] = useState<Array<Major>>(props.majors);
  const [specs, setSpecs] = useState<Array<Specialization>>(props.specs);
  const [mainMajor, setMMajor] = useState<Major>();
  const [plan, setPlan] = useState<Plan>({});
  function filterCareersList() {
    let careersCodesToPop: Career[] = [];
    let allCareers = [...props.careers]; // copy the array
    let myRemainingUnitCount = 16;
    if (plan.mainMajor) { myRemainingUnitCount -= 8 }
    if (plan.doubleMajor) { myRemainingUnitCount -= 8 }
    if (plan.specializations) { plan.specializations.forEach(() => myRemainingUnitCount -= 4); }
    if (plan.optionalUnits) { plan.optionalUnits.forEach(() => myRemainingUnitCount -= 4); }
    allCareers.forEach((career) => {
      let count = 0;
      let unitsRequired = career.Requirements
      unitsRequired.forEach((unit) => {
        let isCounted = false;
        plan.mainMajor?.Units.forEach((ux) => {
          if (ux === unit) {
            if (!isCounted) { count += 1; isCounted = true; }
          }
        })
        plan.doubleMajor?.Units.forEach((ux) => {
          if (ux === unit) {
            if (!isCounted) { count += 1; isCounted = true; }
          }
        })
        plan.specializations?.forEach((spec) => {
          spec.Units.forEach((ux) => {
            if (ux === unit) {
              if (!isCounted) { count += 1; isCounted = true; }
            }
          })
        })
        plan.optionalUnits?.forEach((ux) => {
          if (ux.UnitCode === unit) {
            if (!isCounted) { count += 1; isCounted = true; }
          }
        })
      })
      if (unitsRequired.length === count) {
        // I HAVE ALL UNITS
      } else {
        // I DONT HAVE ALL UNITS
        const countRemaining = unitsRequired.length - count;
        if (myRemainingUnitCount - countRemaining >= 0) {
          // I CAN STILL GET IT
        } else {
          // POP THIS CAREER
          careersCodesToPop.push(career)
        }
      }
    })

    careersCodesToPop.forEach((career) => {
      allCareers.forEach((careerToPop, idx) => {
        if (career.CareerId === careerToPop.CareerId) {
          allCareers.splice(idx, 1);
        }
      })
    })
    setCareers(allCareers);
  }
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
  function setMainMajor(major: Major) { // TODO: Handle switching main major, currently does not check if you have units/specs/double major you cant have in combination
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
    if ('UnitCode' in s) { // TODO: OR you have antireqs
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
              let majorCheck = checkUnitInMajor(temp.mainMajor!, unit);
              if (!majorCheck) {
                let myUnits: string[] = [];
                myUnits = [...temp.mainMajor!.Units]
                if (temp.specializations) {
                  myUnits = [...myUnits, ...temp.specializations[0]!.Units]
                  temp.optionalUnits.forEach((u) => {
                    if (u.UnitCode !== unit.UnitCode) {
                      myUnits.push(u.UnitCode);
                    }
                  })
                }
                let preReqRet = checkIfHavePrereqs(myUnits, unit);
                if (preReqRet[0]) {
                  let err = `You do not have prerequistes for unit ${unit.Name}, you require: `
                  preReqRet[1]!.forEach((path) => {
                    path.forEach((u) => {
                      err += `${u} and `
                    })
                    err = err.slice(0, -4);
                    err += `OR `
                  })
                  err = err.slice(0, -3)
                  temp.optionalUnits.pop();
                  alert(err); // switch to a material ui prompt
                } else {
                  let antiReqRet = checkIfHaveAntireqs(myUnits, unit);
                  if (antiReqRet[0]) {
                    let err = `You have a antirequiste/s for unit ${unit.Name}: `
                    antiReqRet[1]!.forEach((u) => {
                      err += `${u}, `
                    })
                    temp.optionalUnits.pop();
                    alert(err);
                  } else {
                    setPlan(temp);
                  }
                }
              } else {
                alert(`Main major: ${temp.mainMajor?.Name} already has unit: ${unit.Name}`) // switch to a material ui prompt
              }
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
            let majorCheck = checkUnitInMajor(temp.mainMajor!, unit);
            if (!majorCheck) {
              let myUnits: string[] = [];
              myUnits = [...temp.mainMajor!.Units]
              if (temp.specializations) {
                if (temp.specializations[0]!) {
                  myUnits = [...myUnits, ...temp.specializations[0]!.Units]
                }
                temp.optionalUnits.forEach((u) => {
                  if (u.UnitCode !== unit.UnitCode) {
                    myUnits.push(u.UnitCode);
                  }
                })
              }
              let preReqRet = checkIfHavePrereqs(myUnits, unit);
              if (preReqRet[0]) {
                let err = `You do not have prerequistes for unit ${unit.Name}, you require: `
                preReqRet[1]!.forEach((path) => {
                  path.forEach((u) => {
                    err += `${u} and `
                  })
                  err = err.slice(0, -4);
                  err += `OR `
                })
                err = err.slice(0, -3)
                temp.optionalUnits.pop();
                alert(err); // switch to a material ui prompt
              } else {
                let antiReqRet = checkIfHaveAntireqs(myUnits, unit);
                if (antiReqRet[0]) {
                  let err = `You have a antirequiste/s for unit ${unit.Name}: `
                  antiReqRet[1]!.forEach((u) => {
                    err += `${u}, `
                  })
                  temp.optionalUnits.pop();
                  alert(err);
                } else {
                  setPlan(temp);
                }
              }
            } else {
              alert(`Main major: ${temp.mainMajor?.Name} already has unit: ${unit.Name}`) // switch to a material ui prompt
            }
          }
        }
      }
    } else if ('MajorCode' in s) {
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
        // no need to check antireqs as if you hit this path you are finished.
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
            let antiCheck = false;
            if (temp.optionalUnits) { // Check unit Anti reqs
              let unitCheck = specAntireqsCheckUnits(spec, temp.optionalUnits);
              antiCheck = unitCheck[0];
              if (antiCheck) {
                let errMsg = `${spec.Name} contains unit antireqs that you are taking as optionals: `;
                unitCheck[1]?.forEach((u) => {
                  errMsg += `${u.Name} `;
                })
                alert(errMsg); // switch to a material ui prompt
              }
            }
            if (temp.specializations.length === 2) { // check spec anti reqs
              spec.SpecAntiReqs.forEach((path) => {
                path.forEach((sp) => {
                  if (sp === temp.specializations![0].SpecializationCode) {
                    antiCheck = true;
                    alert(`${spec.Name} contains spec antireq that you are taking as a first spec: ${temp.specializations![0].Name}`) // switch to a material ui prompt
                  }
                })
              })
            }
            let firstMajorCheck = specAntireqsCheckMajor(spec, temp.mainMajor!);
            if (firstMajorCheck) {
              antiCheck = true;
              alert(`Your main major is a major anti requiste to specialization: ${spec.Name}`) // switch to a material ui prompt
            }
            if (!antiCheck) {
              setPlan(temp);
            } else {
              temp.specializations.pop();
            }
          }
        } else {
          if (temp.specializations.length > 0 && temp.specializations[0].Internal) {
            if (temp.specializations[0].SpecializationCode === spec.SpecializationCode) {
              alert("You already have this specialization in your plan"); // switch to a material ui prompt
            } else {
              let antiCheck = false;
              temp.specializations.push(spec);
              if (temp.optionalUnits) { // Check unit Anti reqs
                let unitCheck = specAntireqsCheckUnits(spec, temp.optionalUnits);
                antiCheck = unitCheck[0];
                if (antiCheck) {
                  let errMsg = `${spec.Name} contains unit antireqs that you are taking as optionals: `;
                  unitCheck[1]?.forEach((u) => {
                    errMsg += `${u.Name} `;
                  })
                  alert(errMsg); // switch to a material ui prompt
                }
              }
              if (temp.specializations.length === 2) { // check spec anti reqs
                spec.SpecAntiReqs.forEach((path) => {
                  path.forEach((sp) => {
                    if (sp === temp.specializations![0].SpecializationCode) {
                      antiCheck = true;
                      alert(`${spec.Name} contains spec antireq that you are taking as a first spec: ${temp.specializations![0].Name}`) // switch to a material ui prompt
                    }
                  })
                })
              }
              let firstMajorCheck = specAntireqsCheckMajor(spec, temp.mainMajor!);
              if (firstMajorCheck) {
                antiCheck = true;
                alert(`Your main major is a major anti requiste to specialization: ${spec.Name}`) // switch to a material ui prompt
              }
              if (!antiCheck) {
                setPlan(temp);
              } else {
                temp.specializations.pop();
              }
            }
          } else {
            alert("You cannot have two external specializations"); // switch to a material ui prompt
          }
        }
      } else {
        temp.specializations = [spec];
        let antiCheck = false;
        if (temp.optionalUnits) { // Check unit Anti reqs
          let unitCheck = specAntireqsCheckUnits(spec, temp.optionalUnits);
          antiCheck = unitCheck[0];
          if (antiCheck) {
            let errMsg = `${spec.Name} contains unit antireqs that you are taking as optionals: `;
            unitCheck[1]?.forEach((u) => {
              errMsg += `${u.Name} `;
            })
            alert(errMsg); // switch to a material ui prompt
          }
        }
        if (temp.specializations.length === 2) { // check spec anti reqs
          spec.SpecAntiReqs.forEach((path) => {
            path.forEach((sp) => {
              if (sp === temp.specializations![0].SpecializationCode) {
                antiCheck = true;
                alert(`${spec.Name} contains spec antireq that you are taking as a first spec: ${temp.specializations![0].Name}`) // switch to a material ui prompt
              }
            })
          })
        }
        let firstMajorCheck = specAntireqsCheckMajor(spec, temp.mainMajor!);
        if (firstMajorCheck) {
          antiCheck = true;
          alert(`Your main major is a major anti requiste to specialization: ${spec.Name}`) // switch to a material ui prompt
        }
        if (!antiCheck) {
          setPlan(temp);
        } else {
          temp.specializations.pop();
        }
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
    filterCareersList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [plan]);
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