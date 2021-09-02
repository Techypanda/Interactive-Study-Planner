import { Box, Container, Typography, Button, TextField } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import UnitEntry from "../components/units/UnitEntry";
import styled from "styled-components";

function MajorManagement(props: DefaultProps) {
  const history = useHistory();

  return (
    <Container id="majormanagement" className={props.className}>
      <Box id="titlebar" display="flex" justifyContent="center" alignItems="center" marginY={2}>
        <Button variant="outlined" onClick={() => history.push("/majors/create")}>CREATE</Button>
        <Typography display="inline" variant="h4">{props.username} - Major Management</Typography>
      </Box>
      <Box id="searchcontainer" display="flex">
        <TextField variant="outlined" placeholder="Search Units..." className="searchbar" />
        <Button color="primary" variant='contained' className="searchbtn">GO</Button>
      </Box>
      <Box id="units" marginTop={2}>
        {/* <UnitEntry unitContent="Max hasn't written the read API yet." unitTitle="Example Major" /> */}
      </Box>
    </Container>
  )
}
export default styled(MajorManagement)`
  #titlebar h4 {
    margin: auto;
  }
  #searchcontainer .searchbtn {
    margin-left: 15px;
  }
  #searchcontainer .searchbar {
    height: 36px;
    flex-grow: 1;
  }
  #searchcontainer .searchbar .MuiInputBase-root {
    height: 100%;
  }
`;