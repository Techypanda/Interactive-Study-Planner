import { Box, Button, Grid } from "@material-ui/core";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { PaginatedTablesProps, PromptData, Unit, Plan } from "../../types";
import Error from "../shared/Error";
import SemesterTable from "./SemesterTable";
import CurtinLogo from "../../static/curtinbase.jpg";
import CareerTable from "./CareerTable";
import { useHistory } from "react-router";

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

function doPagination(pageCount: number, plan: Plan): Array<Array<Unit[]>> {
  const paginatedUnits: Array<Array<Unit[]>> = [];
  let sem = 1
  let unitCpy = [...(plan.allUnits!)]
  let stillSorting = true


  const depGroups: Unit[][] = [] // Sem Group -> Sem Group -> Sem Group ...

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
  depGroups.push([...fySemOne], [...fySemTwo])

  let iterations = 0;
  let len = unitCpy.length;
  let earlyBreak = false
  while (len !== 0 && iterations < 24 && !earlyBreak) { // more then 24 iterations is probably something wrong with data
    let end = false
    let newGroup = []
    while (!end) {
      end = true
      // 100% a graph is the correct approach here but i'm not sure how you would apply it here...
      for (let i = 0; i < unitCpy.length; i++) { // cant use foreach as you cant break and it is a unsafe context...
        let satisifiedPrereq = false
        const currUnit = unitCpy[i]
        if ((currUnit.Prerequistes.length === 1 || currUnit.Prerequistes[0] === [] || currUnit.Prerequistes[0] === ['']) && (currUnit.Semester === sem || currUnit.Semester === 12)) {
          satisifiedPrereq = true
        }
        for (let ii = 0; ii < currUnit.Prerequistes.length; ii++) {
          let hits = 0
          const preReqGroup = currUnit.Prerequistes[ii]
          if (preReqGroup[0] !== "") {
            for (let iii = 0; iii < preReqGroup.length; iii++) {
              const prereq = preReqGroup[iii]
              for (let iiii = 0; iiii < depGroups.length; iiii++) {
                const g = depGroups[iiii]
                for (let iiiii = 0; iiiii < g.length; iiiii++) {
                  const u = g[iiiii]
                  if (u.UnitCode === prereq) {
                    hits += 1
                  }
                }
              }
            }
          }
          if (hits === preReqGroup.length && (currUnit.Semester === sem || currUnit.Semester === 12)) {
            satisifiedPrereq = true
            break
          }
        }
        if (satisifiedPrereq) {
          end = false
        }
        if (!end) {
          // Add and Break to repeat from start
          newGroup.push(currUnit)
          unitCpy.splice(i, 1) // remove it
          break // end the for loop
        }
      }
    }
    // I have a semester group now add it to dependency group, switch to next sem, repeat until you no longer have units in unitCpy
    iterations += 1
    if (newGroup.length !== 0) {
      depGroups.push(newGroup)
    }
    sem = sem === 1 ? 2 : 1
  }
  console.log(depGroups)
  console.log(unitCpy)

  paginatedUnits[0] = [[...depGroups[0]], [...depGroups[1]]]
  depGroups.splice(0, 1)
  depGroups.splice(0, 1)

  const semOneY1 = []
  const semTwoY1 = []
  const semOneY2 = []
  const semTwoY2 = []
  len = semOneY1.length
  while (len < 4) {
    let needOverflow = true
    for (let i = 0; i < depGroups[0].length; i++) {
      const u = depGroups[0][i]
      if (semOneY1.length < 4) {
        if (u.Semester === 1) {
          semOneY1.push(u)
          depGroups[0].splice(i, 1)
          needOverflow = false
          break
        }
      }
    }
    if (needOverflow) {
      for (let i = 0; i < depGroups[0].length; i++) {
        const u = depGroups[0][i]
        if (semOneY1.length < 4) {
          if (u.Semester === 12) {
            semOneY1.push(u)
            depGroups[0].splice(i, 1)
            needOverflow = false
            break
          }
        }
      }
    }
    len = semOneY1.length
  }
  len = semTwoY1.length
  while (len < 4) {
    let needOverflow = true
    for (let i = 0; i < depGroups[1].length; i++) {
      const u = depGroups[1][i]
      if (semTwoY1.length < 4) {
        if (u.Semester === 2) {
          semTwoY1.push(u)
          depGroups[1].splice(i, 1)
          needOverflow = false
          break
        }
      }
    }
    if (needOverflow) {
      for (let i = 0; i < depGroups[0].length; i++) { // first grab from the group before me
        const u = depGroups[0][i]
        if (semOneY2.length < 4) {
          if (u.Semester === 12) {
            semOneY2.push(u)
            depGroups[0].splice(i, 1)
            needOverflow = false
            break
          }
        }
      }
      if (needOverflow) { // then grab from my group
        for (let i = 0; i < depGroups[1].length; i++) {
          const u = depGroups[1][i]
          if (semTwoY1.length < 4) {
            if (u.Semester === 12) {
              semTwoY2.push(u)
              depGroups[1].splice(i, 1)
              needOverflow = false
              break
            }
          }
        }
      }
    }
    len = semTwoY1.length
  }
  paginatedUnits.push([[...semOneY1], [...semTwoY1]]) // this approach doesnt work at all


  paginatedUnits.push([[], []])
  return paginatedUnits
}

function PaginatedTables(props: PaginatedTablesProps) {
  const history = useHistory();
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
        <Grid container spacing={2}>
          <Grid item sm={5}>
            <Box display="flex" justifyContent="space-between" mt={3}>
              <Box mr={3}>
                <Button variant="contained" className="curtinBtn" onClick={() => history.push('/UnitsFirst')}>Back To Course Planner</Button>
              </Box>
              <Box>
                <Button variant="contained" className="curtinBtn" onClick={() => history.push('/')}>Return To Main Menu</Button>
              </Box>
            </Box>
            <Box mt={4}>
              <img src={CurtinLogo} height={200} width={200} alt="curtin logo" />
            </Box>
          </Grid>
          <Grid item xs={7}>
            <Box mt={3}>
              <CareerTable />
            </Box>
          </Grid>
        </Grid>
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