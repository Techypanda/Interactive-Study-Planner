import { Box, Button, Container, Typography } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
function NotFound(props: DefaultProps) {
  const history = useHistory();
  return (
    <Box className={props.className} display="flex" justifyContent="center" top={0} left={0} position="absolute" height="100vh" width="100vw" alignItems="center">
      <Container>
        <Typography variant="h1" align="center">404</Typography>
        <Typography variant="h4" className="subtext" align="center">The page you are looking for does not exist.</Typography>
        <Typography variant="subtitle1" className="subtext" align="center">(Unless you were looking for the 404 page, then it does exist)</Typography>
        <Box display="flex" justifyContent="center" mt={2}>
          <Button variant="contained" color="secondary" onClick={() => history.push('/')}>Go Home</Button>
        </Box>
      </Container>
    </Box>
  )
}
export default styled(NotFound)`
.logo {
  object-fit: contain;
  max-width: 450px !important;
  width: 100%;
}
.subtext {
  font-weight: 300;
}
`;