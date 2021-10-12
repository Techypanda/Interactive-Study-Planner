import { Box, Container, Grid, useMediaQuery } from "@material-ui/core";
import TopDownInitialMain from "../components/shared/TopDownInitialMain";
import EmptyCurrentPlan from "../components/shared/EmptyCurrentPlan";
import { DefaultProps } from "../types";
import { BounceLoader } from "react-spinners";
import {
  useCareers,
  useMajors,
  useSpecializations,
  useUnits,
} from "../api/hooks";
import CareerList from "../components/UnitsFirst/CareerList";

export default function TopdownInitial(props: DefaultProps) {
  const careers = useCareers();
  const majors = useMajors();
  const units = useUnits();
  const specs = useSpecializations();
  const hideSides = useMediaQuery("(max-width: 755px)")
  return (
    <Box>
      {careers.isLoading ||
        majors.isLoading ||
        units.isLoading ||
        specs.isLoading ? (
        <Box my={2}>
          <BounceLoader color="#1473AB" loading={true} size={150} />
        </Box>
      ) : (
        <>
          {careers.isError ||
            majors.isError ||
            units.isError ||
            specs.isError ? (
            <h1>Error Has Occurred</h1>
          ) : (
            <>
              {!hideSides ?
                <Grid container className="sameHeight">
                  <Grid item xs={2} className="sameHeight">
                    <EmptyCurrentPlan />
                  </Grid>
                  <Grid item xs={12} sm={8} className="sameHeight">
                    <TopDownInitialMain
                      careers={careers.data?.data!}
                      majors={majors.data?.data!}
                      units={units.data?.data!}
                      specs={specs.data?.data!}
                    />
                  </Grid>
                  <Grid item xs={2} className="sameHeight">
                    <CareerList careers={careers.data?.data!} />
                  </Grid>
                </Grid> : <Container>
                  <TopDownInitialMain
                    careers={careers.data?.data!}
                    majors={majors.data?.data!}
                    units={units.data?.data!}
                    specs={specs.data?.data!}
                  />
                </Container>
              }
            </>
          )}
        </>
      )}
    </Box>
  );
}
