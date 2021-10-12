import { Box, Button, Grid, useMediaQuery } from "@material-ui/core";
import { useEffect, useMemo, useState } from "react";
import styled from "styled-components";
import { PaginatedTablesProps, PromptData, Unit, Plan, } from "../../types";
import Error from "../shared/Error";
import { OptionalTable, SemTable } from "./SemesterTable";
import CurtinLogo from "../../static/curtinbase.webp"
import CareerTable from "./CareerTable";
import { useHistory } from "react-router";

const HARD_CODED_FIRSTYEAR_UNITS = [ // These are required in first year for medical degree
  "MEDI1000", "HUMB1000", "BIOL1004", "CHEM1007", "INDH1006", "EPID1000", "HUMB1001", "GENE1000"
]

function getMajorUnits(unitMap: any, plan: Plan) {
  const out: any[][][] = [[[null, null], [null, null]], [[null, null], [null, null]]]
  const extraYearTwos: any = []
  const extraYearThrees: any = []
  plan.mainMajor!.Units.forEach((unitCode) => {
    if ((unitMap[unitCode] as Unit).Year !== 2 && (unitMap[unitCode] as Unit).Year !== 3) {
      alert(`bad data, year is not 2 or 3 for unit: ${unitCode}`)
      // @ts-ignore
      throw Error(`bad data, year is not 2 or 3 for unit: ${unitCode}`)
    }
    if ((unitMap[unitCode] as Unit).Year! === 2) {
      if ((unitMap[unitCode] as Unit).Semester === 1) {
        if (out[0][0][0] == null) {
          out[0][0][0] = unitMap[unitCode]
        } else {
          out[0][0][1] = unitMap[unitCode]
        }
      } else if ((unitMap[unitCode] as Unit).Semester === 2) {
        if (out[0][1][0] == null) {
          out[0][1][0] = unitMap[unitCode]
        } else {
          out[0][1][1] = unitMap[unitCode]
        }
      } else {
        extraYearTwos.push(unitMap[unitCode])
      }
    } else {
      if ((unitMap[unitCode] as Unit).Semester === 1) {
        if (out[1][0][0] == null) {
          out[1][0][0] = unitMap[unitCode]
        } else {
          out[1][0][1] = unitMap[unitCode]
        }
      } else if ((unitMap[unitCode] as Unit).Semester === 2) {
        if (out[1][1][0] == null) {
          out[1][1][0] = unitMap[unitCode]
        } else {
          out[1][1][1] = unitMap[unitCode]
        }
      } else {
        extraYearThrees.push(unitMap[unitCode])
      }
    }
  })
  /* console.log(out)
  console.log(extraYearTwos)
  console.log(extraYearThrees) */
  let iterations = 0
  console.log(extraYearTwos)
  while (extraYearTwos.length >= 1 && iterations <= 10) {
    iterations += 1
    if (iterations > 10) {
      // alert('infinite loop - bad data')
      // @ts-ignore
      throw new Error('infinite loop - bad data')
    }
    console.warn('bad data, theres extra year twos.')
    let filled = false
    for (let i = 0; i < out[0][0].length; i++) {
      const v = out[0][0][i]
      if (v === null) {
        out[0][0][i] = extraYearTwos.pop()
        filled = true
        break
      }
    }
    if (!filled) {
      for (let i = 0; i < out[0][1].length; i++) {
        const v = out[0][1][i]
        if (v === null) {
          out[0][1][i] = extraYearTwos.pop()
          filled = true
          break
        }
      }
    }
  }
  iterations = 0
  while (extraYearThrees.length >= 1 && iterations <= 10) {
    iterations += 1
    if (iterations > 10) {
      // alert('infinite loop - bad data')
      // @ts-ignore
      throw new Error('infinite loop - bad data')
    }
    console.warn('bad data, theres extra year threes.')
    let filled = false
    for (let i = 0; i < out[1][0].length; i++) {
      const v = out[1][0][i]
      if (v === null) {
        out[1][0][i] = extraYearThrees.pop()
        filled = true
        break
      }
    }
    if (!filled) {
      for (let i = 0; i < out[1][1].length; i++) {
        const v = out[1][1][i]
        if (v === null) {
          out[1][1][i] = extraYearThrees.pop()
          filled = true
          break
        }
      }
    }
  }
  return out
}

// Biomedical has cursed exceptions althroughout its degree, this function will do the swaps
function doCursedBiomedicalExceptions() {
  /*
    For double major of Molecular Genetics and Pharmacology - for the Pharmacology major, Y2S1, swap 'BCCB Foundations in Biochemistry' for 'BIOL2004 Research Skills for Biomedical Sciences'  
    For double major in Human Biomedicine and Molecular Genetics: for the Molecular Genetics major, in Y3S2, swap 'BIOL3010 Bioscience Reserch Project' for BIOL3009 Advanced Bioinformatics' 
    Human Biomedicine major students - if choose Human Pathology and Immunology and Cell Biology Specialisations, due to duplication, need to substitute MEDI2000 Foundations of Immunobiology for an Optional unit for the Immunology and Cell Biology Specialisation  
    For Human Biomedicine major students - need to substitute BCCB Foundations in Biochemistry for PHRM2005 Foundations in Pharmacology
    Mol Gen Major students cannot choose Human Genetics and Genomics Spec
    Pharmacology Spec students if they don't have BCCB2000 on their study plan must do BCCB2000 (check with Ricky)
    MG and HB majors - BIOL3010 duplicated - add alternate core BIOL3008 and MEDS3005
    MG and Pharmacology majors - BCCB2000 duplicated - add alternate core BIOL2004
    Human Path and Immuno and Cell Bio Specialisation - remove from drop-down if HumBiomed major is chosen
  */

}

function getOtherUnits(unitMap: any, plan: Plan) {
  const out: any[][][] = [[[null, null], [null, null]], [[null, null], [null, null]]]
  const extraYearTwos: any = []
  const extraYearThrees: any = []
  if (plan.doubleMajor) { // double major
    plan.doubleMajor!.Units.forEach((unitCode) => {
      if ((unitMap[unitCode] as Unit).Year !== 2 && (unitMap[unitCode] as Unit).Year !== 3) {
        alert(`bad data, year is not 2 or 3 for unit: ${unitCode}`)
        // @ts-ignore
        throw Error(`bad data, year is not 2 or 3 for unit: ${unitCode}`)
      }
      if ((unitMap[unitCode] as Unit).Year! === 2) {
        if ((unitMap[unitCode] as Unit).Semester === 1) {
          if (out[0][0][0] == null) {
            out[0][0][0] = unitMap[unitCode]
          } else {
            out[0][0][1] = unitMap[unitCode]
          }
        } else if ((unitMap[unitCode] as Unit).Semester === 2) {
          if (out[0][1][0] == null) {
            out[0][1][0] = unitMap[unitCode]
          } else {
            out[0][1][1] = unitMap[unitCode]
          }
        } else {
          extraYearTwos.push(unitMap[unitCode])
        }
      } else {
        if ((unitMap[unitCode] as Unit).Semester === 1) {
          if (out[1][0][0] == null) {
            out[1][0][0] = unitMap[unitCode]
          } else {
            out[1][0][1] = unitMap[unitCode]
          }
        } else if ((unitMap[unitCode] as Unit).Semester === 2) {
          if (out[1][1][0] == null) {
            out[1][1][0] = unitMap[unitCode]
          } else {
            out[1][1][1] = unitMap[unitCode]
          }
        } else {
          extraYearThrees.push(unitMap[unitCode])
        }
      }
    })
  } else {
    if (plan.optionalUnits) { // 1 ispec + 4 optionals
      plan.specializations!.forEach((spec) => {
        spec.Units.forEach((unitCode) => {
          if ((unitMap[unitCode] as Unit).Year === 2) {
            if ((unitMap[unitCode] as Unit).Semester === 1) {
              for (let i = 0; i < out[0][0].length; i++) {
                if (out[0][0][i] === null) {
                  out[0][0][i] = (unitMap[unitCode] as Unit)
                  break
                }
              }
            } else if ((unitMap[unitCode] as Unit).Semester === 2) {
              for (let i = 0; i < out[0][1].length; i++) {
                if (out[0][1][i] === null) {
                  out[0][1][i] = (unitMap[unitCode] as Unit)
                  break
                }
              }
            } else {
              extraYearTwos.push((unitMap[unitCode] as Unit))
            }
          } else {
            if ((unitMap[unitCode] as Unit).Semester === 1) {
              for (let i = 0; i < out[1][0].length; i++) {
                if (out[1][0][i] === null) {
                  out[1][0][i] = (unitMap[unitCode] as Unit)
                  break
                }
              }
            } else if ((unitMap[unitCode] as Unit).Semester === 2) {
              for (let i = 0; i < out[1][1].length; i++) {
                if (out[1][1][i] === null) {
                  out[1][1][i] = (unitMap[unitCode] as Unit)
                  break
                }
              }
            } else {
              extraYearThrees.push((unitMap[unitCode] as Unit))
            }
          }
        })
      })
      // then do optionals

    } else { // 2 ispecs or 1 ispec + 1 espec
      plan.specializations!.forEach((spec) => {
        spec.Units.forEach((unitCode) => {
          if ((unitMap[unitCode] as Unit).Year === 2) {
            if ((unitMap[unitCode] as Unit).Semester === 1) {
              for (let i = 0; i < out[0][0].length; i++) {
                if (out[0][0][i] === null) {
                  out[0][0][i] = (unitMap[unitCode] as Unit)
                  break
                }
              }
            } else if ((unitMap[unitCode] as Unit).Semester === 2) {
              for (let i = 0; i < out[0][1].length; i++) {
                if (out[0][1][i] === null) {
                  out[0][1][i] = (unitMap[unitCode] as Unit)
                  break
                }
              }
            } else {
              extraYearTwos.push((unitMap[unitCode] as Unit))
            }
          } else {
            if ((unitMap[unitCode] as Unit).Semester === 1) {
              for (let i = 0; i < out[1][0].length; i++) {
                if (out[1][0][i] === null) {
                  out[1][0][i] = (unitMap[unitCode] as Unit)
                  break
                }
              }
            } else if ((unitMap[unitCode] as Unit).Semester === 2) {
              for (let i = 0; i < out[1][1].length; i++) {
                if (out[1][1][i] === null) {
                  out[1][1][i] = (unitMap[unitCode] as Unit)
                  break
                }
              }
            } else {
              extraYearThrees.push((unitMap[unitCode] as Unit))
            }
          }
        })
      })
    }
  }

  let iterations = 0
  while (extraYearTwos.length >= 1 && iterations <= 10) {
    iterations += 1
    if (iterations > 10) {
      // alert('infinite loop - bad data')
      // @ts-ignore
      throw new Error('infinite loop - bad data')
    }
    console.warn('bad data, theres extra year twos.')
    let filled = false
    for (let i = 0; i < out[0][0].length; i++) {
      const v = out[0][0][i]
      if (v === null) {
        out[0][0][i] = extraYearTwos.pop()
        filled = true
        break
      }
    }
    if (!filled) {
      for (let i = 0; i < out[0][1].length; i++) {
        const v = out[0][1][i]
        if (v === null) {
          out[0][1][i] = extraYearTwos.pop()
          filled = true
          break
        }
      }
    }
  }
  iterations = 0
  while (extraYearThrees.length >= 1 && iterations <= 10) {
    iterations += 1
    if (iterations > 10) {
      // alert('infinite loop - bad data')
      // @ts-ignore
      throw new Error('infinite loop - bad data')
    }
    console.warn('bad data, theres extra year threes.')
    let filled = false
    for (let i = 0; i < out[1][0].length; i++) {
      const v = out[1][0][i]
      if (v === null) {
        out[1][0][i] = extraYearThrees.pop()
        filled = true
        break
      }
    }
    if (!filled) {
      for (let i = 0; i < out[1][1].length; i++) {
        const v = out[1][1][i]
        if (v === null) {
          out[1][1][i] = extraYearThrees.pop()
          filled = true
          break
        }
      }
    }
  }
  return out
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

  const units = useMemo(() => {
    const mUnits = getMajorUnits(hashmapOfUnits, props.plan)
    const eUnits = getOtherUnits(hashmapOfUnits, props.plan)
    return [[[...mUnits[0][0], ...eUnits[0][0]], [...mUnits[0][1], ...eUnits[0][1]]], [[...mUnits[1][0], ...eUnits[1][0]], [...mUnits[1][1], ...eUnits[1][1]]]]
  }, [hashmapOfUnits, props.plan])
  const semOneOptions = useMemo(() => props.plan.optionalUnits?.filter(u => u.Semester === 1 || u.Semester === 12), [props.plan.optionalUnits])
  const semTwoOptions = useMemo(() => props.plan.optionalUnits?.filter(u => u.Semester === 2 || u.Semester === 12), [props.plan.optionalUnits])
  doCursedBiomedicalExceptions() // do swaps

  const selectOptional = (slot: number, sem: number, unitCode: string) => { // slot === year
    if (slot === 2) {
      if (sem === 1) {
        const allPrevUnits = [hashmapOfUnits["MEDI1000"], hashmapOfUnits["HUMB1000"], hashmapOfUnits["BIOL1004"],
        hashmapOfUnits["CHEM1007"], hashmapOfUnits["EPID1000"], hashmapOfUnits["GENE1000"], hashmapOfUnits["HUMB1001"],
        hashmapOfUnits["INDH1006"]]
        const resp = checkIfHavePrereqs(allPrevUnits, hashmapOfUnits[unitCode])
        if (!resp[0]) {
          return true
        } else {
          let err = `You do not have prerequistes for unit ${hashmapOfUnits[unitCode].Name}, you require: `
          resp[1]!.forEach((path) => {
            path.forEach((u) => {
              err += `${u} and `
            })
            err = err.slice(0, -4);
            err += `OR `
          })
          err = err.slice(0, -3)
          setError({ promptTitle: 'Unit Selection Error', promptContent: err, showPrompt: false })
        }
      } else {
        const allPrevUnits = [hashmapOfUnits["MEDI1000"], hashmapOfUnits["HUMB1000"], hashmapOfUnits["BIOL1004"],
        hashmapOfUnits["CHEM1007"], hashmapOfUnits["EPID1000"], hashmapOfUnits["GENE1000"], hashmapOfUnits["HUMB1001"],
        hashmapOfUnits["INDH1006"], ...units[0][0]].filter(u => u != null)
        const resp = checkIfHavePrereqs(allPrevUnits, hashmapOfUnits[unitCode])
        if (!resp[0]) {
          return true
        } else {
          let err = `You do not have prerequistes for unit ${hashmapOfUnits[unitCode].Name}, you require: `
          resp[1]!.forEach((path) => {
            path.forEach((u) => {
              err += `${u} and `
            })
            err = err.slice(0, -4);
            err += `OR `
          })
          err = err.slice(0, -3)
          setError({ promptTitle: 'Unit Selection Error', promptContent: err, showPrompt: false })
        }
      }
    } else {
      if (sem === 1) {
        const allPrevUnits = [hashmapOfUnits["MEDI1000"], hashmapOfUnits["HUMB1000"], hashmapOfUnits["BIOL1004"],
        hashmapOfUnits["CHEM1007"], hashmapOfUnits["EPID1000"], hashmapOfUnits["GENE1000"], hashmapOfUnits["HUMB1001"],
        hashmapOfUnits["INDH1006"], ...units[0][0], ...units[0][1]].filter(u => u != null)
        const resp = checkIfHavePrereqs(allPrevUnits, hashmapOfUnits[unitCode])
        if (!resp[0]) {
          return true
        } else {
          let err = `You do not have prerequistes for unit ${hashmapOfUnits[unitCode].Name}, you require: `
          resp[1]!.forEach((path) => {
            path.forEach((u) => {
              err += `${u} and `
            })
            err = err.slice(0, -4);
            err += `OR `
          })
          err = err.slice(0, -3)
          setError({ promptTitle: 'Unit Selection Error', promptContent: err, showPrompt: false })
        }
      } else {
        const allPrevUnits = [hashmapOfUnits["MEDI1000"], hashmapOfUnits["HUMB1000"], hashmapOfUnits["BIOL1004"],
        hashmapOfUnits["CHEM1007"], hashmapOfUnits["EPID1000"], hashmapOfUnits["GENE1000"], hashmapOfUnits["HUMB1001"],
        hashmapOfUnits["INDH1006"], ...units[0][0], ...units[0][1], ...units[1][0]].filter(u => u != null)
        const resp = checkIfHavePrereqs(allPrevUnits, hashmapOfUnits[unitCode])
        if (!resp[0]) {
          return true
        } else {
          let err = `You do not have prerequistes for unit ${hashmapOfUnits[unitCode].Name}, you require: `
          resp[1]!.forEach((path) => {
            path.forEach((u) => {
              err += `${u} and `
            })
            err = err.slice(0, -4);
            err += `OR `
          })
          err = err.slice(0, -3)
          setError({ promptTitle: 'Unit Selection Error', promptContent: err, showPrompt: false })
        }
      }
    }
    return false
  }

  useEffect(() => {
    setPaginatedUnits(doPagination(yearCount, props.plan))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [yearCount])

  const tablet = useMediaQuery("(max-width: 1000px)") // break at nice round number

  return (
    <>
      <Error onAccept={() => setError({ promptTitle: error.promptTitle, promptContent: error.promptContent, showPrompt: false })} promptTitle={error.promptTitle} promptContent={error.promptContent} showPrompt={error.showPrompt} />
      <Box className={props.className} mt={2}>
        <Box display="flex" className="semesterTableContainer">
          {paginatedUnits.map((year, idx) =>
            <SemTable key={idx} className="semesterTable" year={idx + 1} semesterOneUnits={year[0]} semesterTwoUnits={year[1]} />
          )}
          {!units[0][0][3] && !units[0][1][3] && !units[1][1][3] && !units[1][0][3] ?
            <>
              <OptionalTable selected={selectOptional} className="semesterTable" semOneChoices={semOneOptions!} semTwoChoices={semTwoOptions!} year={2} semesterOneUnits={units[0][0]} semesterTwoUnits={units[0][1]} />
              <OptionalTable selected={selectOptional} className="semesterTable" semOneChoices={semOneOptions!} semTwoChoices={semTwoOptions!} year={3} semesterOneUnits={units[1][0]} semesterTwoUnits={units[1][1]} />
            </>
            : <>
              <SemTable className="semesterTable" year={2} semesterOneUnits={units[0][0]} semesterTwoUnits={units[0][1]} />
              <SemTable className="semesterTable" year={3} semesterOneUnits={units[1][0]} semesterTwoUnits={units[1][1]} />
            </>
          }
          {/* <SemesterTable onChange={setY2} semSelectedOne={selectedY2SemOne} semSelectedTwo={selectedY2SemTwo} year={2} semOne={availableS1Units} semTwo={availableS2Units} />
          <SemesterTable onChange={setY3} semSelectedOne={selectedY3SemOne} semSelectedTwo={selectedY3SemTwo} year={3} semOne={availableS1Units} semTwo={availableS2Units} /> */ }
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