import { Box, Button, CircularProgress, Container, MenuItem, Select, TextField, Typography } from "@material-ui/core";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import { useUnits } from "../../api/hooks";
import PaginatedUnits from "../../components/units/PaginatedUnits";
import { useState } from "react";

function UnitManagement(props: DefaultProps) {
  const history = useHistory();
  const units = useUnits()
  const [filtered, setFiltered] = useState<Array<Unit>>()
  const [searchMode, setSearchMode] = useState<"Name" | "Description" | "UnitCode">("Name")
  function filter(searchPhrase: string, field: "Name" | "Description" | "UnitCode" = "Name") {
    const filteredUnits: Array<Unit> = []
    const allLoadedUnits = units.data?.data
    if (allLoadedUnits) {
      allLoadedUnits.forEach((unit) => {
        if (unit[field].toUpperCase().includes(searchPhrase.toUpperCase())) {
          filteredUnits.push(unit)
        }
      })
    }
    setFiltered(filteredUnits)
  }
  return (
    <Container id="unitmanagement" className={props.className}>
      <Box id="titlebar" display="flex" justifyContent="center" alignItems="center" marginY={2}>
        <Button variant="outlined" onClick={() => history.push("/units/create")}>CREATE</Button>
        <Typography display="inline" variant="h4">{props.username} - Unit Management</Typography>
      </Box>
      <Box id="searchcontainer" display="flex">
        <TextField variant="outlined" placeholder="Search Units..." className="searchbar" onChange={(e) => filter(e.target.value, searchMode)} />
        <Box marginLeft={2}>
          <Select
            id="select-searchmode"
            value={searchMode}
            variant="outlined"
            className="gutHeight"
            onChange={(e) => setSearchMode(e.target.value as "Name" | "Description" | "UnitCode")}
          >
            <MenuItem value={"Name"}>Name</MenuItem>
            <MenuItem value={"Description"}>Description</MenuItem>
            <MenuItem value={"UnitCode"}>Unit Code</MenuItem>
          </Select>
        </Box>
      </Box>
      <Box id="units" marginTop={2}>
        {units.isLoading
          ? <CircularProgress />
          : <>
            {!units.isError
              ? <PaginatedUnits units={!filtered ? units.data?.data! : filtered} />
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