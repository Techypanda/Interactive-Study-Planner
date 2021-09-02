import { Box, Select, Fab, MenuItem } from "@material-ui/core";
import { Add } from "@material-ui/icons";
import { useState } from "react";
import styled from "styled-components";

function DeliveryAddition(props: DeliveryAddProps) {
  const [val, setVal] = useState("Online");
  return (
    <>
      <Select variant="outlined" labelId="select-delivery" id="select-delivery" value={val} onChange={(e) => setVal((e.target as HTMLInputElement).value)}>
        <MenuItem value="Internal">Internal</MenuItem>
        <MenuItem value="Online">Online</MenuItem>
      </Select>
      <Box display="inline-block" ml={2}>
        <Fab size="small" color="primary" onClick={() => props.add(val as "Online" | "Internal")}>
          <Add />
        </Fab>
      </Box>
    </>
  )
}
export default styled(DeliveryAddition)`
`;