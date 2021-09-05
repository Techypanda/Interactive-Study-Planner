import { Box, Container, Typography, Button, TextField, CircularProgress } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import UnitEntry from "../../components/units/UnitEntry";
import styled from "styled-components";
import { useSpecializations } from "../../api/hooks";
import PaginatedSpecializations from "../../components/specialization/PaginatedSpecializations";
import { useState } from "react";

function SpecializationManagement(props: DefaultProps) {
  const history = useHistory();
  const specs = useSpecializations()
  const [filtered, setFiltered] = useState<Array<Specialization>>()
  return (
    <Container id="specializationmanagement" className={props.className}>
      <Box id="titlebar" display="flex" justifyContent="center" alignItems="center" marginY={2}>
        <Button variant="outlined" onClick={() => history.push("/specializations/create")}>CREATE</Button>
        <Typography display="inline" variant="h4">{props.username} - Specialization Management</Typography>
      </Box>
      <Box id="searchcontainer" display="flex">
        <TextField variant="outlined" placeholder="Search Units..." className="searchbar" />
        <Button color="primary" variant='contained' className="searchbtn">GO</Button>
      </Box>
      <Box id="units" marginTop={2}>
      {specs.isLoading
          ? <CircularProgress />
          : <>
            {!specs.isError
              ? <PaginatedSpecializations specs={!filtered ? specs.data?.data! : filtered} />
              : <Typography>Sorry, An error has occured, please inform a admin</Typography>}
          </>
        }
      </Box>
    </Container>
  )
}
export default styled(SpecializationManagement)`
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