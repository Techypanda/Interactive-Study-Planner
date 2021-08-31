import { Container, LinearProgress } from "@material-ui/core";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { useUnit } from "../../api/hooks";
import UnitForm from "../../components/units/UnitForm";
import NotFound from "../NotFound";

function EditUnit(props: DefaultProps) {
  const { UnitCode } = useParams<{ UnitCode: string }>();
  const unit = useUnit(UnitCode)

  return (
  <>
    {unit.isLoading
    ? <LinearProgress />
    : <>
      {unit.isError ? <NotFound />
      : 
        <Container>
          <UnitForm unit={((unit.data?.data!) as unknown as Array<Unit>)[0]} />
        </Container>
      }
    </>}
  </>
  )
}
export default styled(EditUnit)`
`;