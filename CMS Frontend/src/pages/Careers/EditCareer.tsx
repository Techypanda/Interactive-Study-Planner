import { Container, LinearProgress } from "@material-ui/core";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { useCareer } from "../../api/hooks";
import CareerForm from "../../components/careers/CareerForm";
import NotFound from "../NotFound";

function EditCareer(props: DefaultProps) {
  const { CareerId } = useParams<{ CareerId: string }>();
  const career = useCareer(CareerId)

  return (
  <>
    {career.isLoading
    ? <LinearProgress /> 
    : <>
      {career.isError ? <NotFound />
      : 
        <Container>
          <CareerForm career={((career.data?.data! as any).Item as Career)} /> {/* Cursed Career Wrapper as it returns a Item from API */}
        </Container>
      }
    </>}
  </>
  )
}
export default styled(EditCareer)`
`;