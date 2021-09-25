import { Box, Grid, Typography } from "@material-ui/core";
import styled from "styled-components";
import CareerList from "../components/UnitsFirst/CareerList";
import PlanList from "../components/UnitsFirst/PlanList";
import { DefaultProps } from "../types";

function UnitsFirst(props: DefaultProps) {
  return (
    <Grid container> { /* this isnt going to work on mobile :/ */}
      <Grid item xs={2}>
        <PlanList />
      </Grid>
      <Grid item xs={8}>

      </Grid>
      <Grid item xs={2}>
        <CareerList />
      </Grid>
    </Grid>
  )
}
export default styled(UnitsFirst)`
`