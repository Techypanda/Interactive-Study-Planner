import { Box, Container, Typography, Button, TextField, CircularProgress } from "@material-ui/core";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import { useMajors } from "../../api/hooks";
import PaginatedMajors from "../../components/majors/PaginatedMajors";

function MajorManagement(props: DefaultProps) {
  const history = useHistory();
  const [filtered, setFiltered] = useState<Array<Major>>()
  const majors = useMajors();
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
        {majors.isLoading
          ? <CircularProgress />
          : <>
            {!majors.isError
              ? <PaginatedMajors majors={!filtered ? majors.data?.data! : filtered} />
              : <Typography>Sorry, An error has occured, please inform a admin</Typography>}
          </>
        }
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