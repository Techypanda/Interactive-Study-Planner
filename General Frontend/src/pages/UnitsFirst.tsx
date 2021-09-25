import { Box, Grid } from "@material-ui/core";
import { useState } from "react";
import styled from "styled-components";
import { useSpecializations } from "../api/hooks";
import { useCareers, useMajors, useUnits } from "../components/shared/hooks";
import CareerList from "../components/UnitsFirst/CareerList";
import Initial from "../components/UnitsFirst/Initial";
import PlanList from "../components/UnitsFirst/PlanList";
import { DefaultProps } from "../types";
import { BounceLoader } from "react-spinners";
import UnitsFirstSPAContext from "../components/UnitsFirst/UnitsFirstSPAContext";

enum UNITSFIRSTMODES {
  initial,
}

function UnitsFirst(props: DefaultProps) { // Bootstrap component for SPA Context
  const careers = useCareers();
  const majors = useMajors();
  const units = useUnits();
  const specs = useSpecializations();
  return (
    <Box className={props.className}> {/* Horrible Javascript Abuse TODO: Rework this */}
      {careers.isLoading || majors.isLoading || units.isLoading || specs.isLoading
        ? <Box my={2}><BounceLoader color="#1473AB" loading={true} size={150} /></Box>
        :
        <>
          {careers.isError || majors.isError || units.isError || specs.isError
            ? <h1>Error Has Occured</h1>
            : <UnitsFirstSPAContext careers={careers.data?.data!} majors={majors.data?.data!} units={units.data?.data!} specs={specs.data?.data!} />
          }
        </>
      }
    </Box>
  )
}
export default styled(UnitsFirst)`
`