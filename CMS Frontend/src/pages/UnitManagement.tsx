import { DefaultProps } from "../types";
import { Box, Button, Container, Paper, TextField, Typography } from "@material-ui/core";
import styled from "styled-components";
import UnitEntry from "../components/units/UnitEntry";

function UnitManagement(props: DefaultProps) {

  return (
    <Container id="unitmanagement" className={props.className}>
      <Box id="titlebar" display="flex" justifyContent="center" alignItems="center" marginY={2}>
        <Button variant="outlined">CREATE</Button>
        <Typography display="inline" variant="h4">{props.username} - Unit Management</Typography>
      </Box>
      <Box id="searchcontainer">
        <TextField variant="outlined" placeholder="Search Units..." className="searchbar" />
        <Button color="primary" variant='contained' className="searchbtn">GO</Button>
      </Box>
      <Box id="units" marginTop={2}>
        <UnitEntry unitContent="Max hasn't written the read API yet." unitTitle="Example Unit" />
      </Box>
    </Container>
  )
}
export default styled(UnitManagement)`
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