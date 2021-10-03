import { Box, Button } from "@material-ui/core";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { PaginatedTablesProps, PromptData, Unit, Plan } from "../../types";
import Error from "../shared/Error";
import SemesterTable from "./SemesterTable";

const HARD_CODED_FIRSTYEAR_UNITS = [ // These are required in first year for medical degree
  "MEDI1000", "HUMB1000", "BIOL1004", "CHEM1007", "INDH1006", "EPID1000", "HUMB1001", "GENE1000"
]

// https://stackoverflow.com/questions/8188548/splitting-a-js-array-into-n-arrays
function spread(array: any, pageCount: number, balanced = true) {
  if (pageCount < 2)
    return [array];
  var len = array.length,
    out = [],
    i = 0,
    size;
  if (len % pageCount === 0) {
    size = Math.floor(len / pageCount);
    while (i < len) {
      out.push(array.slice(i, i += size));
    }
  }
  else if (balanced) {
    while (i < len) {
      size = Math.ceil((len - i) / pageCount--);
      out.push(array.slice(i, i += size));
    }
  }
  else {
    pageCount--;
    size = Math.floor(len / pageCount);
    if (len % size === 0)
      size--;
    while (i < size * pageCount) {
      out.push(array.slice(i, i += size));
    }
    out.push(array.slice(size * pageCount));
  }
  return out;
}

function isFirstYearUnit(u: Unit) {
  let retVal = false;
  HARD_CODED_FIRSTYEAR_UNITS.forEach((h) => {
    if (h === u.UnitCode) {
      retVal = true;
    }
  })
  return retVal;
}

function checkIfHavePrereqs(unitsIAmTaking: Unit[], unit: Unit): [boolean, string[][]?] {
  let retVal: [boolean, string[][]?] = [false, []];
  if (unit.Prerequistes.length >= 1 && unit.Prerequistes[0].length >= 1 && unit.Prerequistes[0][0] !== "") {
    retVal[0] = true;
    unit.Prerequistes.forEach((path) => {
      let pathMet: string[] = [];
      path.forEach((i) => {
        unitsIAmTaking.forEach((k) => {
          if (i === k.UnitCode) {
            pathMet.push(k.UnitCode);
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

function doPagination(pageCount: number, plan: Plan): Array<Array<Unit[]>> {
  const paginatedUnits: Array<Array<Unit[]>> = [];
  let sem = 1
  let unitCpy = [...(plan.allUnits!)]
  let stillSorting = true


  const depGroups = [] // Sem Group -> Sem Group -> Sem Group ...

  let fySemOne = []
  let fySemTwo = []
  while (stillSorting === true) {
    stillSorting = false
    for (let i = 0; i < unitCpy.length; i++) {
      if (isFirstYearUnit(unitCpy[i])) {
        if (unitCpy[i].UnitCode === "MEDI1000" || unitCpy[i].UnitCode === "HUMB1000" || unitCpy[i].UnitCode === "BIOL1004" || unitCpy[i].UnitCode === "CHEM1007") {
          fySemOne.push(unitCpy[i])
        } else {
          fySemTwo.push(unitCpy[i])
        }
        unitCpy.splice(i, 1);
        stillSorting = true
        break
      }
    }
  }
  depGroups.push([...fySemOne],[...fySemTwo])
  // eslint-disable-next-line no-loop-func
  /* plan.doubleMajor?.Units.forEach((z) => {
    if (z === unitCpy[i].UnitCode) {
      if (FTOwner === "") { FTOwner = "DOUBLEMAJOR" }
      unitCpy[i].Prerequistes.forEach((p) => {
        p.forEach((u) => {
          plan.mainMajor?.Units.forEach((k) => {
            if (u === k) {
              hasrelevantPrereq = true
            }
          })
        })
      })
      if (FTOwner === "DOUBLE") {
        if (hasrelevantPrereq) {
          tySemTwoFT.push(unitCpy[i])
          unitCpy.splice(i, 1)
        } else {
          if (sySemTwoFT.length > 2) {
            sySemTwoFT.push(unitCpy[i])
            unitCpy.splice(i, 1)
          } else {
            tySemTwoFT.push(unitCpy[i])
            unitCpy.splice(i, 1)
          }
        }
      } else {
        if (hasrelevantPrereq) {
          tySemTwoST.push(unitCpy[i])
          unitCpy.splice(i, 1)
        } else {
          if (sySemTwoST.length > 2) {
            tySemTwoST.push(unitCpy[i])
            unitCpy.splice(i, 1)
          } else {
            sySemTwoST.push(unitCpy[i])
            unitCpy.splice(i, 1)
          }
        }
      }
      needToBreak = true
    }
  })
  if (needToBreak) {
    break;
  }
  /*
  plan.specializations?.forEach((z) => {
 
  })
  */
  /* let loops = 0
  const paginatedUnits: Array<Array<Unit[]>> = [];
  let unitCpy = [...(plan.allUnits!)]
  
  let fyUnit: Unit[] = []
  let dependencyGroups: Unit[][] = [];
  let stillSorting = true
  while (stillSorting === true) {
    stillSorting = false
    for (let i = 0; i < unitCpy.length; i++) {
      if (isFirstYearUnit(unitCpy[i])) {
        fyUnit.push(unitCpy[i])
        unitCpy.splice(i, 1);
        stillSorting = true
        break
      }
    }
  }
  fyUnit.forEach((e) => console.log(e.UnitCode))
  unitCpy.forEach((e) => console.log(e.UnitCode))
  dependencyGroups.push(fyUnit) // First Dependency group is all the first year units
  while (unitCpy.length > 0 && loops < 999) {
    let allMyUnitsSoFarFromDependency: Unit[] = []
    dependencyGroups.forEach((group) => {
      group.forEach((u) => {
        allMyUnitsSoFarFromDependency.push(u)
      })
    })
    let newDependencyGroup: Unit[] = []
    let stillGoing = true
    while (stillGoing === true && loops < 999) {
      console.log('looping')
      stillGoing = false
      for (let i = 0; i < unitCpy.length; i++) {
        let ret = checkIfHavePrereqs([...allMyUnitsSoFarFromDependency, ...newDependencyGroup], unitCpy[i])
        if (!ret[0]) { // false === you have the unit prereqs.
          let semOneCountInGroup = 0;
          let semTwoCountInGroup = 0;
          let optionalCount = 0;
          let isOptional = false;
          newDependencyGroup.forEach((c) => {
            if (c.Semester === 1) {
              semOneCountInGroup += 1
            } else if (c.Semester === 2) {
              semTwoCountInGroup += 1
            }
            plan.optionalUnits?.forEach((u) => {
              if (u.UnitCode === c.UnitCode) {
                optionalCount += 1
                isOptional = true
              }
            })
          }) // i am in hell
          if (!isOptional || (isOptional && optionalCount < 4)) { // each group should have at most 4 optionals
            if ((unitCpy[i].Semester === 1 && semOneCountInGroup < 2) || (unitCpy[i].Semester === 2 && semTwoCountInGroup < 2) || (unitCpy[i].Semester === 12 && (semOneCountInGroup < 2 || semTwoCountInGroup < 2))) {
              newDependencyGroup.push(unitCpy[i])
              unitCpy.splice(i, 1);
              stillGoing = true
              console.log(dependencyGroups)
              console.log(newDependencyGroup)
              console.log(unitCpy)
              break
            }
          }
        }
      }
      loops += 1
      if (loops > 998) {
        console.error('end loop failed')
        //alert("failed to find prereqs talk to admin")
      }
    }
    if (newDependencyGroup.length > 1) {
      dependencyGroups.push(newDependencyGroup)
    }
  }
  console.log(dependencyGroups)
  console.log(unitCpy) */
  /* let done = false;
  while (!done) {
    let coll = false
    for (let i = 0; i < semOneUnits.length; i++) {
      let prereqs = semOneUnits[i].Prerequistes
      if (i !== 0) { // check all units before me if ive done the prereqs
        
      } else { // move me to the next year
        
      }
    }
    if (!coll) {
      done = true
    }
  } */


  /* const unitsInAYear = spread(units, pageCount)
  unitsInAYear.forEach((x, i) => {
    const semesterOneCount = x.length - Math.floor(x.length / 2)
    // const semesterTwoCount = Math.floor(x.length / 2)
    const tmp = []
    tmp.push(x.slice(0, semesterOneCount))
    tmp.push(x.slice(semesterOneCount, x.length))
    paginatedUnits.push(tmp)
  }) */
  return paginatedUnits
}

function PaginatedTables(props: PaginatedTablesProps) {
  const [yearCount, setYearCount] = useState(3);
  const [error, setError] = useState<PromptData>({ promptTitle: "", promptContent: "", showPrompt: false });
  const [paginatedUnits, setPaginatedUnits] = useState(doPagination(yearCount, props.plan));
  useEffect(() => {
    setPaginatedUnits(doPagination(yearCount, props.plan))
  }, [yearCount])
  function addYear() {
    if ((yearCount * 2) < 24) {
      setYearCount(yearCount + 1)
    } else {
      setError({ promptTitle: "You Cannot Possibly Do Another Year", promptContent: "You can't add another year as it would mean taking 0 units in a year.", showPrompt: true })
    }
  }
  function removeYear() {
    if (yearCount > 3) {
      setYearCount(yearCount - 1)
    } else {
      setError({ promptTitle: "You Cannot Remove Another Year", promptContent: "If you wish to overload please talk to a unit coordinator, we do not support overloading unless you have high grades at Curtin.", showPrompt: true })
    }
  }
  return (
    <>
      <Error onAccept={() => setError({ promptTitle: error.promptTitle, promptContent: error.promptContent, showPrompt: false })} promptTitle={error.promptTitle} promptContent={error.promptContent} showPrompt={error.showPrompt} />
      <Box className={props.className} mt={2}>
        <Box display="flex" className="semesterTableContainer">
          {paginatedUnits.map((year, idx) =>
            <SemesterTable key={idx} className="semesterTable" year={idx + 1} semesterOneUnits={year[0]} semesterTwoUnits={year[1]} />
          )}
        </Box>
        <Box textAlign="left" mt={3}>
          <Box display="inline" mr={3}>
            <Button variant="contained" className="curtinBtn" onClick={() => removeYear()}>Remove A Year</Button>
          </Box>
          <Box display="inline">
            <Button variant="contained" className="curtinBtn" onClick={() => addYear()}>Add A Year</Button>
          </Box>
        </Box>
      </Box>
    </>
  )
}
export default styled(PaginatedTables)`
.curtinBtn {
  background-color: #f3c32d !important;
}
.semesterTableContainer {
  overflow-x: scroll;
}
.semesterTable {
  min-width: 780px;
  max-width: 40vw;
  width: 780px;
}
`;