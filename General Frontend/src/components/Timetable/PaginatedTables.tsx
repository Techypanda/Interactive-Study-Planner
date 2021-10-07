import { Box, Button, Grid, useMediaQuery } from "@material-ui/core";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { PaginatedTablesProps, PromptData, Unit, Plan, } from "../../types";
import Error from "../shared/Error";
import SemesterTable, { SemTable } from "./SemesterTable";
import CurtinLogo from "../../static/curtinbase.webp"
import CareerTable from "./CareerTable";
import { useHistory } from "react-router";

const HARD_CODED_FIRSTYEAR_UNITS = [ // These are required in first year for medical degree
  "MEDI1000", "HUMB1000", "BIOL1004", "CHEM1007", "INDH1006", "EPID1000", "HUMB1001", "GENE1000"
]

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
  let unitCpy = [...(plan.allUnits!)]
  let stillSorting = true

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
  paginatedUnits.push([[...fySemOne], [...fySemTwo]])
  return paginatedUnits
}

function PaginatedTables(props: PaginatedTablesProps) {
  const hashmapOfUnits: any = props.plan.allUnits!.reduce((map, u) => {
    // @ts-ignore
    map[u.UnitCode] = u
    return map
  }, {})
  const history = useHistory();
  const [yearCount] = useState(3);
  const [error, setError] = useState<PromptData>({ promptTitle: "", promptContent: "", showPrompt: false });
  const [paginatedUnits, setPaginatedUnits] = useState(doPagination(yearCount, props.plan));
  const [selectedY2SemOne, setSelectedY2SemOne] = useState<Unit[]>([])
  const [selectedY2SemTwo, setSelectedY2SemTwo] = useState<Unit[]>([])
  const [selectedY3SemOne, setSelectedY3SemOne] = useState<Unit[]>([])
  const [selectedY3SemTwo, setSelectedY3SemTwo] = useState<Unit[]>([])
  const [availableS1Units, setAvailableS1Units] = useState<Unit[]>(computeAvailableS1())
  const [availableS2Units, setAvailableS2Units] = useState<Unit[]>(computeAvailableS2())
  useEffect(() => {
    setPaginatedUnits(doPagination(yearCount, props.plan))
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [yearCount])

  function computeAvailableS1(): Unit[] {
    const units = [...props.plan.allUnits!]
    let filtered = false;
    while (!filtered) {
      let collOccured = false
      for (let i = 0; i < units.length; i++) {
        const u = units[i]
        if (u.UnitCode === "MEDI1000" || u.UnitCode === "HUMB1000" || u.UnitCode === "BIOL1004" || u.UnitCode === "CHEM1007") {
          units.splice(i, 1)
          collOccured = true
          break
        }
      }
      if (!collOccured) {
        filtered = true
      }
    }
    while (true) {
      let collOccured = false
      for (let i = 0; i < units.length; i++) {
        const u = units[i]
        if (u.Semester !== 1 && u.Semester !== 12) {
          units.splice(i, 1)
          collOccured = true
          break
        }
      }
      if (!collOccured) {
        break
      }
    }
    while (true) {
      let collOccured = false
      for (let i = 0; i < units.length; i++) {
        const u = units[i]
        for (let ii = 0; ii < selectedY2SemOne.length; ii++) {
          const u2 = selectedY2SemOne[ii]
          if (u2 != null) {
            if (u.UnitCode === u2.UnitCode && !u2.disabled) {
              const removed = units.splice(i, 1)
              removed[0].disabled = true
              units.push(removed[0])
              collOccured = true
              break
            }
          }
        }
        if (collOccured) { break }
        for (let ii = 0; ii < selectedY2SemTwo.length; ii++) {
          const u2 = selectedY2SemTwo[ii]
          if (u2 != null) {
            if (u.UnitCode === u2.UnitCode && !u2.disabled) {
              const removed = units.splice(i, 1)
              removed[0].disabled = true
              units.push(removed[0])
              collOccured = true
              break
            }
          }
        }
        if (collOccured) { break }
        for (let ii = 0; ii < selectedY3SemOne.length; ii++) {
          const u2 = selectedY3SemOne[ii]
          if (u2 != null) {
            if (u.UnitCode === u2.UnitCode && !u2.disabled) {
              const removed = units.splice(i, 1)
              removed[0].disabled = true
              units.push(removed[0])
              collOccured = true
              break
            }
          }
        }
        if (collOccured) { break }
        for (let ii = 0; ii < selectedY3SemTwo.length; ii++) {
          const u2 = selectedY3SemTwo[ii]
          if (u2 != null) {
            if (u.UnitCode === u2.UnitCode && !u2.disabled) {
              const removed = units.splice(i, 1)
              removed[0].disabled = true
              units.push(removed[0])
              collOccured = true
              break
            }
          }
        }
        if (collOccured) { break }
      }
      if (!collOccured) {
        break
      }
    }
    return units
  }
  function computeAvailableS2(): Unit[] {
    const units = [...props.plan.allUnits!]
    let filtered = false;
    while (!filtered) {
      let collOccured = false
      for (let i = 0; i < units.length; i++) {
        const u = units[i]
        if (u.UnitCode === "EPID1000" || u.UnitCode === "GENE1000" || u.UnitCode === "HUMB1001" || u.UnitCode === "INDH1006") {
          units.splice(i, 1)
          collOccured = true
          break
        }
      }
      if (!collOccured) {
        filtered = true
      }
    }
    while (true) {
      let collOccured = false
      for (let i = 0; i < units.length; i++) {
        const u = units[i]
        if (u.Semester !== 2 && u.Semester !== 12) {
          units.splice(i, 1)
          collOccured = true
          break
        }
      }
      if (!collOccured) {
        break
      }
    }
    while (true) {
      let collOccured = false
      for (let i = 0; i < units.length; i++) {
        const u = units[i]
        for (let ii = 0; ii < selectedY2SemOne.length; ii++) {
          const u2 = selectedY2SemOne[ii]
          if (u2 != null) {
            if (u.UnitCode === u2.UnitCode && !u2.disabled) {
              const removed = units.splice(i, 1)
              removed[0].disabled = true
              units.push(removed[0])
              collOccured = true
              break
            }
          }
        }
        if (collOccured) { break }
        for (let ii = 0; ii < selectedY2SemTwo.length; ii++) {
          const u2 = selectedY2SemTwo[ii]
          if (u2 != null) {
            if (u.UnitCode === u2.UnitCode && !u2.disabled) {
              const removed = units.splice(i, 1)
              removed[0].disabled = true
              units.push(removed[0])
              collOccured = true
              break
            }
          }
        }
        if (collOccured) { break }
        for (let ii = 0; ii < selectedY3SemOne.length; ii++) {
          const u2 = selectedY3SemOne[ii]
          if (u2 != null) {
            if (u.UnitCode === u2.UnitCode && !u2.disabled) {
              const removed = units.splice(i, 1)
              removed[0].disabled = true
              units.push(removed[0])
              collOccured = true
              break
            }
          }
        }
        if (collOccured) { break }
        for (let ii = 0; ii < selectedY3SemTwo.length; ii++) {
          const u2 = selectedY3SemTwo[ii]
          if (u2 != null) {
            if (u.UnitCode === u2.UnitCode && !u2.disabled) {
              const removed = units.splice(i, 1)
              removed[0].disabled = true
              units.push(removed[0])
              collOccured = true
              break
            }
          }
        }
        if (collOccured) { break }
      }
      if (!collOccured) {
        break
      }
    }
    return units
  }

  useEffect(() => {
    window.setTimeout(() => {
      /* localStorage.setItem(`${process.env.DEVELOPMENT ? "dev-" : ""}y2semOne`, JSON.stringify(selectedY2SemOne))
      localStorage.setItem(`${process.env.DEVELOPMENT ? "dev-" : ""}y2semTwo`, JSON.stringify(selectedY2SemTwo))
      localStorage.setItem(`${process.env.DEVELOPMENT ? "dev-" : ""}y3semOne`, JSON.stringify(selectedY3SemOne)) Annoying amount of work to persist these
      localStorage.setItem(`${process.env.DEVELOPMENT ? "dev-" : ""}y3semTwo`, JSON.stringify(selectedY3SemTwo)) */
      setAvailableS1Units(computeAvailableS1())
      setAvailableS2Units(computeAvailableS2())
    }, 3000)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedY2SemOne, selectedY2SemTwo, selectedY3SemOne, selectedY3SemTwo])

  function setY3(sem: 1 | 2, pos: 0 | 1 | 2 | 3, val: string) {
    if (sem === 1) {
      const cpy = [...selectedY3SemOne]
      const allPrevUnits = [hashmapOfUnits["MEDI1000"], hashmapOfUnits["HUMB1000"], hashmapOfUnits["BIOL1004"],
      hashmapOfUnits["CHEM1007"], hashmapOfUnits["EPID1000"], hashmapOfUnits["GENE1000"], hashmapOfUnits["HUMB1001"],
      hashmapOfUnits["INDH1006"], ...selectedY2SemOne, ...selectedY2SemTwo]
      const ret = checkIfHavePrereqs(allPrevUnits, hashmapOfUnits[val])
      if (!ret[0]) {
        cpy[pos] = hashmapOfUnits[val]
      } else {
        let err = `You do not have prerequistes for unit ${hashmapOfUnits[val].Name}, you require: `
        ret[1]!.forEach((path) => {
          path.forEach((u) => {
            err += `${u} and `
          })
          err = err.slice(0, -4);
          err += `OR `
        })
        err = err.slice(0, -3)
        setError({ promptTitle: "Failed To Select", promptContent: err, showPrompt: true })
      }
      setSelectedY3SemOne(cpy)
    } else {
      const cpy = [...selectedY3SemTwo]
      const allPrevUnits = [hashmapOfUnits["MEDI1000"], hashmapOfUnits["HUMB1000"], hashmapOfUnits["BIOL1004"],
      hashmapOfUnits["CHEM1007"], hashmapOfUnits["EPID1000"], hashmapOfUnits["GENE1000"], hashmapOfUnits["HUMB1001"],
      hashmapOfUnits["INDH1006"], ...selectedY2SemOne, ...selectedY2SemTwo, ...selectedY3SemOne]
      const ret = checkIfHavePrereqs(allPrevUnits, hashmapOfUnits[val])
      if (!ret[0]) {
        cpy[pos] = hashmapOfUnits[val]
      } else {
        let err = `You do not have prerequistes for unit ${hashmapOfUnits[val].Name}, you require: `
        ret[1]!.forEach((path) => {
          path.forEach((u) => {
            err += `${u} and `
          })
          err = err.slice(0, -4);
          err += `OR `
        })
        err = err.slice(0, -3)
        setError({ promptTitle: "Failed To Select", promptContent: err, showPrompt: true })
      }
      setSelectedY3SemTwo(cpy)
    }
  }
  function setY2(sem: 1 | 2, pos: 0 | 1 | 2 | 3, val: string) {
    if (sem === 1) {
      const cpy = [...selectedY2SemOne]
      const allPrevUnits = [hashmapOfUnits["MEDI1000"], hashmapOfUnits["HUMB1000"], hashmapOfUnits["BIOL1004"],
      hashmapOfUnits["CHEM1007"], hashmapOfUnits["EPID1000"], hashmapOfUnits["GENE1000"], hashmapOfUnits["HUMB1001"],
      hashmapOfUnits["INDH1006"]]
      const ret = checkIfHavePrereqs(allPrevUnits, hashmapOfUnits[val])
      if (!ret[0]) {
        cpy[pos] = hashmapOfUnits[val]
      } else {
        let err = `You do not have prerequistes for unit ${hashmapOfUnits[val].Name}, you require: `
        ret[1]!.forEach((path) => {
          path.forEach((u) => {
            err += `${u} and `
          })
          err = err.slice(0, -4);
          err += `OR `
        })
        err = err.slice(0, -3)
        setError({ promptTitle: "Failed To Select", promptContent: err, showPrompt: true })
      }
      setSelectedY2SemOne(cpy)
    } else {
      const cpy = [...selectedY2SemTwo]
      const allPrevUnits = [hashmapOfUnits["MEDI1000"], hashmapOfUnits["HUMB1000"], hashmapOfUnits["BIOL1004"],
      hashmapOfUnits["CHEM1007"], hashmapOfUnits["EPID1000"], hashmapOfUnits["GENE1000"], hashmapOfUnits["HUMB1001"],
      hashmapOfUnits["INDH1006"], ...selectedY2SemOne]
      const ret = checkIfHavePrereqs(allPrevUnits, hashmapOfUnits[val])
      if (!ret[0]) {
        cpy[pos] = hashmapOfUnits[val]
      } else {
        let err = `You do not have prerequistes for unit ${hashmapOfUnits[val].Name}, you require: `
        ret[1]!.forEach((path) => {
          path.forEach((u) => {
            err += `${u} and `
          })
          err = err.slice(0, -4);
          err += `OR `
        })
        err = err.slice(0, -3)
        setError({ promptTitle: "Failed To Select", promptContent: err, showPrompt: true })
      }
      setSelectedY2SemTwo(cpy)
    }
  }

  const tablet = useMediaQuery("(max-width: 1000px)") // break at nice round number

  return (
    <>
      <Error onAccept={() => setError({ promptTitle: error.promptTitle, promptContent: error.promptContent, showPrompt: false })} promptTitle={error.promptTitle} promptContent={error.promptContent} showPrompt={error.showPrompt} />
      <Box className={props.className} mt={2}>
        <Box display="flex" className="semesterTableContainer">
          {paginatedUnits.map((year, idx) =>
            <SemTable key={idx} className="semesterTable" year={idx + 1} semesterOneUnits={year[0]} semesterTwoUnits={year[1]} />
          )}
          <SemesterTable onChange={setY2} semSelectedOne={selectedY2SemOne} semSelectedTwo={selectedY2SemTwo} year={2} semOne={availableS1Units} semTwo={availableS2Units} />
          <SemesterTable onChange={setY3} semSelectedOne={selectedY3SemOne} semSelectedTwo={selectedY3SemTwo} year={3} semOne={availableS1Units} semTwo={availableS2Units} />
        </Box>
        <Grid container spacing={2}>
          <Grid item md={5} xs={12}>
            <Box display="flex" justifyContent="space-between" mt={3}>
              <Box mr={3}>
                <Button variant="contained" className="curtinBtn" onClick={() => history.push('/UnitsFirst')}>Back To Course Planner</Button>
              </Box>
              <Box>
                <Button variant="contained" className="curtinBtn" onClick={() => history.push('/')}>Return To Main Menu</Button>
              </Box>
            </Box>
            <Box mt={4} display={tablet ? "none" : "block"}>
              <img src={CurtinLogo} height={200} width={200} alt="curtin logo" />
            </Box>
          </Grid>
          <Grid item md={7} xs={12}>
            <Box mt={3}>
              <CareerTable careers={props.careers} />
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