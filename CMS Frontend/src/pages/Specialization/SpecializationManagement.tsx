import { Box, Container, Typography, Button, TextField, CircularProgress, Select, MenuItem } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import { useSpecializations } from "../../api/hooks";
import PaginatedSpecializations from "../../components/specialization/PaginatedSpecializations";
import { useState } from "react";

function SpecializationManagement(props: DefaultProps) {
  const history = useHistory();
  const specs = useSpecializations()
  const [filtered, setFiltered] = useState<Array<Specialization>>()
  const [searchMode, setSearchMode] = useState<"Name" | "Description" | "SpecializationCode">("Name")
  function filter(searchPhrase: string, field: "Name" | "Description" | "SpecializationCode" = "Name") {
    const filteredSpecs: Array<Specialization> = []
    const allLoadedUnits = specs.data?.data
    if (allLoadedUnits) {
      allLoadedUnits.forEach((spec) => {
        if (spec[field].toUpperCase().includes(searchPhrase.toUpperCase())) {
          filteredSpecs.push(spec)
        }
      })
    }
    setFiltered(filteredSpecs)
  }
  return (
    <Container id="specializationmanagement" className={props.className}>
      <Box id="titlebar" display="flex" justifyContent="center" alignItems="center" marginY={2}>
        <Button variant="outlined" onClick={() => history.push("/specializations/create")}>CREATE</Button>
        <Typography display="inline" variant="h4">{props.username} - Specialization Management</Typography>
      </Box>
      <Box id="searchcontainer" display="flex">
        <TextField variant="outlined" placeholder="Search Specializations..." className="searchbar" onChange={(e) => filter(e.target.value, searchMode)} />
        <Box marginLeft={2}>
          <Select
            id="select-searchmode"
            value={searchMode}
            variant="outlined"
            className="gutHeight"
            onChange={(e) => setSearchMode(e.target.value as "Name" | "Description" | "SpecializationCode")}
          >
            <MenuItem value={"Name"}>Name</MenuItem>
            <MenuItem value={"Description"}>Description</MenuItem>
            <MenuItem value={"SpecializationCode"}>Specialization Code</MenuItem>
          </Select>
        </Box>
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