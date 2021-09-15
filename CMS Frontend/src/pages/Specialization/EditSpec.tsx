import { Container, LinearProgress } from "@material-ui/core";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { useSpecialization } from "../../api/hooks";
import SpecForm from "../../components/specialization/SpecForm";
import NotFound from "../NotFound";

function EditSpec(props: DefaultProps) {
  const { SpecCode } = useParams<{ SpecCode: string }>();
  const spec = useSpecialization(SpecCode)

  return (
  <>
    {spec.isLoading
    ? <LinearProgress />
    : <>
      {spec.isError ? <NotFound />
      : 
        <Container>
          <SpecForm spec={((spec.data?.data!) as unknown as Array<Specialization>)[0]} />
        </Container>
      }
    </>}
  </>
  )
}
export default styled(EditSpec)`
`;