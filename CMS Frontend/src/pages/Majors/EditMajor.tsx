import { Container, LinearProgress } from "@material-ui/core";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { useMajor } from "../../api/hooks";
import MajorForm from "../../components/majors/MajorForm";
import UnitForm from "../../components/units/UnitForm";
import NotFound from "../NotFound";

function EditMajor(props: DefaultProps) {
  const { MajorCode } = useParams<{ MajorCode: string }>();
  const major = useMajor(MajorCode)

  return (
  <>
    {major.isLoading
    ? <LinearProgress />
    : <>
      {major.isError ? <NotFound />
      : 
        <Container>
          <MajorForm major={((major.data?.data!) as unknown as Array<Major>)[0]} />
        </Container>
      }
    </>}
  </>
  )
}
export default styled(EditMajor)`
`;