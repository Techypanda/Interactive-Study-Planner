import { Button, Container, Typography, Box } from "@material-ui/core";
import { useHistory } from "react-router";
import styled from "styled-components";
import { useUnits } from "../api/hooks";
import { DefaultProps, Plan, Unit } from "../types";
import { BounceLoader } from "react-spinners";
import PaginatedTables from "../components/Timetable/PaginatedTables";

const HARD_CODED_FIRSTYEAR_UNITS = [ // These are required in first year for medical degree
  "MEDI1000", "HUMB1000", "BIOL1004", "CHEM1007", "INDH1006", "EPID1000", "HUMB1001", "GENE1000"
]

function getUnits(p: Plan, allUnitsInDB: Unit[]): Plan {
  // construct a map from the units to make lookups quick
  const map = allUnitsInDB.reduce((map, u) => {
    // @ts-ignore
    map[u.UnitCode] = u
    return map
  }, {})
  console.log(Object.keys(map).length)
  let unitArr: Unit[] = []
  p.mainMajor?.Units.forEach((u) => {
    // @ts-ignore
    unitArr.push(map[u])
  })
  p.doubleMajor?.Units.forEach((u) => {
    // @ts-ignore
    unitArr.push(map[u])
  })
  p.specializations?.forEach((s) => {
    s.Units.forEach((u) => {
      // @ts-ignore
      unitArr.push(map[u])
    })
  })
  p.optionalUnits?.forEach((u) => {
    unitArr.push(u)
  })
  HARD_CODED_FIRSTYEAR_UNITS.forEach((u) => {
    // @ts-ignore
    unitArr.push(map[u])
  })
  let finalArr = unitArr.sort((a, b) => a.UnitCode.localeCompare(b.UnitCode))
  p.allUnits = finalArr
  return p
}

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
function Timetable(props: DefaultProps) {
  // construct a map from the units to make lookups quick
  const unitDB = useUnits()
  const history = useHistory();
  if (!unitDB.isLoading) {
    if (localStorage.getItem(`${process.env.DEVELOPMENT ? "dev-" : ""}courseplanner-plan`)) {
      const plan = getUnits(JSON.parse(localStorage.getItem(`${process.env.DEVELOPMENT ? "dev-" : ""}courseplanner-plan`)!) as Plan, unitDB.data?.data!.sort((a, b) => a.Name.localeCompare(b.Name))!)
      /* EDGE CASES */
      const map = unitDB.data?.data!.reduce((map, u) => {
        // @ts-ignore
        map[u.UnitCode] = u
        return map
      }, {})
      if ((plan.mainMajor?.MajorCode === "MJRU-MOLGN" && plan.doubleMajor?.MajorCode === "MJRU-PHCOL") || (plan.mainMajor?.MajorCode === "MJRU-PHCOL" && plan.doubleMajor?.MajorCode === "MJRU-MOLGN")) {
        console.warn("Edge case - swap BCCB for BIOL2004")
        for (let i = 0; i < plan.allUnits!.length; i++) {
          if (plan.allUnits![i].UnitCode === "BCCB2000") {
            // @ts-ignore
            plan.allUnits![i] = map["BCCB2000"]
            break
          }
        }
      }
      /* EDGE CASES ^^ */
      return (
        <Container className={props.className} maxWidth="xl">
          <PaginatedTables plan={plan} />
        </Container>
      )
    } else {
      return (
        <Container className={props.className} maxWidth="xl">
          <Typography variant="h4">Sorry, You haven't planned your course yet, please go back to landing and do so.</Typography>
          <Button variant="contained" onClick={() => history.push('/')}>Go To Landing</Button>
        </Container>
      )
    }
  } else {
    return (
      <Container className={props.className} maxWidth="xl">
        <Box my={2}><BounceLoader color="#1473AB" loading={true} size={150} /></Box>
      </Container>
    )
  }
}
export default styled(Timetable)`
.bold {
  font-weight: 600 !important;
}
`;