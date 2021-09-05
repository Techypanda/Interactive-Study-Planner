import { Container } from "@material-ui/core";
import styled from "styled-components";
import SpecForm from "../../components/specialization/SpecForm";

function CreateSpecialization(props: DefaultProps) {
  return (
    <Container className={props.className}>
      <SpecForm />
    </Container>
  )
}

export default styled(CreateSpecialization)`
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