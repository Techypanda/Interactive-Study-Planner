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

function Timetable(props: DefaultProps) {
  const unitDB = useUnits()
  const history = useHistory();
  if (!unitDB.isLoading) {
    if (localStorage.getItem(`${process.env.DEVELOPMENT ? "dev-" : ""}courseplanner-plan`)) {
      const plan = getUnits(JSON.parse(localStorage.getItem(`${process.env.DEVELOPMENT ? "dev-" : ""}courseplanner-plan`)!) as Plan, unitDB.data?.data!.sort((a, b) => a.Name.localeCompare(b.Name))!)
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