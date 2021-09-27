import { Box } from "@material-ui/core";
import styled from "styled-components";
import { useSpecializations } from "../api/hooks";
import { useCareers, useMajors, useUnits } from "../components/shared/hooks";
import { Career, DefaultProps } from "../types";
import { BounceLoader } from "react-spinners";
import UnitsFirstSPAContext from "../components/UnitsFirst/UnitsFirstSPAContext";

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
            : <UnitsFirstSPAContext careers={careers.data?.data!} majors={majors.data?.data!.sort((a, b) => a.Name.localeCompare(b.Name))!} units={units.data?.data!.sort((a, b) => a.Name.localeCompare(b.Name))!} specs={specs.data?.data!.sort((a, b) => a.Name.localeCompare(b.Name))!} />
          }
        </>
      }
    </Box>
  )
}
export default styled(UnitsFirst)`
`