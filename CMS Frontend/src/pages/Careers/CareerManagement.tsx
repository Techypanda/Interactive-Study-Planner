import { Box, Container, Typography, Button, TextField, CircularProgress } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import { useCareers } from "../../api/hooks";
import PaginatedCareers from "../../components/careers/PaginatedCareers";
import { useState } from "react";

function CareerManagement(props: DefaultProps) {
  const history = useHistory();
  const careers = useCareers()
  const [filtered] = useState<Array<Career>>()
  return (
    <Container id="careermanagement" className={props.className}>
      <Box id="titlebar" display="flex" justifyContent="center" alignItems="center" marginY={2}>
        <Button variant="outlined" onClick={() => history.push("/careers/create")}>CREATE</Button>
        <Typography display="inline" variant="h4">{props.username} - Career Management</Typography>
      </Box>
      <Box id="searchcontainer" display="flex">
        <TextField variant="outlined" placeholder="Search Units..." className="searchbar" />
        <Button color="primary" variant='contained' className="searchbtn">GO</Button>
      </Box>
      <Box id="units" marginTop={2}>
      {careers.isLoading
          ? <CircularProgress />
          : <>
            {!careers.isError
              ? <PaginatedCareers careers={!filtered ? careers.data?.data! : filtered} />
              : <Typography>Sorry, An error has occured, please inform a admin</Typography>}
          </>
        }
      </Box>
    </Container>
  )
}
export default styled(CareerManagement)`
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