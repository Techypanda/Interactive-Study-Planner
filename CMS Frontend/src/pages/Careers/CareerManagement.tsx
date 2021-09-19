import { Box, Container, Typography, Button, TextField, CircularProgress, Select, MenuItem } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import { useCareers } from "../../api/hooks";
import PaginatedCareers from "../../components/careers/PaginatedCareers";
import { useState } from "react";

function CareerManagement(props: DefaultProps) {
  const history = useHistory();
  const careers = useCareers()
  const [filtered, setFiltered] = useState<Array<Career>>()
  const [searchMode, setSearchMode] = useState<"CareerId" | "Description" | "Industry" | "Name">("Name")
  function filter(searchPhrase: string, field: "CareerId" | "Description" | "Industry" | "Name" = "Name") {
    const filteredCareers: Array<Career> = []
    const allLoadedCareers = careers.data?.data
    if (allLoadedCareers) {
      allLoadedCareers.forEach((career) => {
        if (career[field].toUpperCase().includes(searchPhrase.toUpperCase())) {
          filteredCareers.push(career)
        }
      })
    }
    setFiltered(filteredCareers)
  }
  return (
    <Container id="careermanagement" className={props.className}>
      <Box id="titlebar" display="flex" justifyContent="center" alignItems="center" marginY={2}>
        <Button variant="outlined" onClick={() => history.push("/careers/create")}>CREATE</Button>
        <Typography display="inline" variant="h4">{props.username} - Career Management</Typography>
      </Box>
      <Box id="searchcontainer" display="flex">
        <TextField variant="outlined" placeholder="Search Units..." className="searchbar" onChange={(e) => filter(e.target.value, searchMode)} />
        <Box marginLeft={2}>
          <Select
            id="select-searchmode"
            value={searchMode}
            variant="outlined"
            className="gutHeight"
            onChange={(e) => setSearchMode(e.target.value as "CareerId" | "Description" | "Industry" | "Name")}
          >
            <MenuItem value={"Name"}>Name</MenuItem>
            <MenuItem value={"Description"}>Description</MenuItem>
            <MenuItem value={"Industry"}>Industry</MenuItem>
            <MenuItem value={"CareerId"}>CareerId</MenuItem>
          </Select>
        </Box>
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
#select-searchmode {
  padding: 8.5px 34px 8.5px 24px !important;
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