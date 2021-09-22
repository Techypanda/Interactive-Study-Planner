import styled from "styled-components";
import { BrowserRouter as Router } from "react-router-dom";

function AuthWrapper(props: AuthWrapperProps) {
  return (
    <Router>
      {props.children}
    </Router>
  )
}
export default styled(AuthWrapper)`
`;