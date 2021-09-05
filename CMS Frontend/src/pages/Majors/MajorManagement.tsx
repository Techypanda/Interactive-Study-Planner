import { Box, Container, Typography, Button, TextField, CircularProgress, Select, MenuItem } from "@material-ui/core";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import { useMajors } from "../../api/hooks";
import PaginatedMajors from "../../components/majors/PaginatedMajors";

function MajorManagement(props: DefaultProps) {
  const history = useHistory();
  const [filtered, setFiltered] = useState<Array<Major>>()
  const majors = useMajors();
  const [searchMode, setSearchMode] = useState<"Name" | "Description" | "MajorCode">("Name")
  function filter(searchPhrase: string, field: "Name" | "Description" | "MajorCode" = "Name") {
    const filteredSpecs: Array<Major> = []
    const allLoadedUnits = majors.data?.data
    if (allLoadedUnits) {
      allLoadedUnits.forEach((major) => {
        if (major[field].toUpperCase().includes(searchPhrase.toUpperCase())) {
          filteredSpecs.push(major)
        }
      })
    }
    setFiltered(filteredSpecs)
  }
  return (
    <Container id="majormanagement" className={props.className}>
      <Box id="titlebar" display="flex" justifyContent="center" alignItems="center" marginY={2}>
        <Button variant="outlined" onClick={() => history.push("/majors/create")}>CREATE</Button>
        <Typography display="inline" variant="h4">{props.username} - Major Management</Typography>
      </Box>
      <Box id="searchcontainer" display="flex">
        <TextField variant="outlined" placeholder="Search Units..." className="searchbar" onChange={(e) => filter(e.target.value, searchMode)} />
        <Box marginLeft={2}>
          <Select
            id="select-searchmode"
            value={searchMode}
            variant="outlined"
            className="gutHeight"
            onChange={(e) => setSearchMode(e.target.value as "Name" | "Description" | "MajorCode")}
          >
            <MenuItem value={"Name"}>Name</MenuItem>
            <MenuItem value={"Description"}>Description</MenuItem>
            <MenuItem value={"MajorCode"}>Major Code</MenuItem>
          </Select>
        </Box>
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