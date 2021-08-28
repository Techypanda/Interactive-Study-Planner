import { DefaultProps } from "../types";
import { Box, Button, CircularProgress, Container, Paper, TextField, Typography } from "@material-ui/core";
import styled from "styled-components";
import UnitEntry from "../components/units/UnitEntry";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { useUnits } from "../api/hooks";
import PaginatedUnits from "../components/units/PaginatedUnits";

function UnitManagement(props: DefaultProps) {
  const history = useHistory();
  const units = useUnits()
  return (
    <Container id="unitmanagement" className={props.className}>
      <Box id="titlebar" display="flex" justifyContent="center" alignItems="center" marginY={2}>
        <Button variant="outlined" onClick={() => history.push("/units/create")}>CREATE</Button>
        <Typography display="inline" variant="h4">{props.username} - Unit Management</Typography>
      </Box>
      <Box id="searchcontainer" display="flex">
        <TextField variant="outlined" placeholder="Search Units..." className="searchbar" />
        <Button color="primary" variant='contained' className="searchbtn">GO</Button>
      </Box>
      <Box id="units" marginTop={2}>
        {units.isLoading
          ? <CircularProgress />
          : <>
            {!units.isError
              ? <PaginatedUnits units={units.data?.data!} />
              : <Typography>Sorry, An error has occured, please inform a admin</Typography>}
          </>
        }
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