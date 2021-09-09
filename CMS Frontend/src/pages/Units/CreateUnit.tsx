import { Container } from "@material-ui/core";
import styled from "styled-components";
import UnitForm from "../../components/units/UnitForm";

function CreateUnit(props: DefaultProps) {
  return (
    <>
      <Container>
        <UnitForm />
      </Container>
    </>
  )
}

export default styled(CreateUnit)`
.background {
  width: 100vw;
  height: 100vh;
  position: absolute;
  background-color: rgba(0,0,0,0.25);
  top: 0;
  left: 0;
  z-index: 99;
}
.loader {
  top: 50%;
  left: 50%;
  position: absolute;
  transform: translate(-75px, -75px);
}
`;