import { Box, Paper, Typography } from "@material-ui/core";
import { useState } from "react";
import styled from "styled-components";
import UnitEntry from "./UnitEntry";

function PaginatedUnits(props: PaginatedUnitsProps) {
  const [paginationCount] = useState(10);
  const [page, setPage] = useState(0);
  const pageLimit = props.units.length / paginationCount === Infinity ? 0 : props.units.length / paginationCount
  const pageIcons = () => {
    const rows = [];
    for (let x = 0; x < pageLimit; x++) {
      rows.push(x)
    }
    return rows;
  }
  return (
    <div className={props.className}>
      {props.units.slice(paginationCount * page, Math.min((paginationCount * page) + paginationCount, props.units.length)).map((unit, _) =>
        <Box mb={1}>
          <UnitEntry unit={unit} />
        </Box>
      )}
      {pageIcons().map((obj: number, _: number) => {
        return <Box mr={1} mt={2} mb={2} display="inline-block" onClick={() => setPage(obj)}>
          <Paper className="pageIconButton">
            <Box px={1} py={0.5}>
              {obj === page
                ? <Typography className="icontxt active">{obj}</Typography>
                : <Typography className="icontxt">{obj}</Typography>
              }
            </Box>
          </Paper>
        </Box>
      })}
    </div>
  )
}
export default styled(PaginatedUnits)`
.pageIconButton {
  cursor: pointer !important;
}
.icontxt {
  color: #ffbf00;
  cursor: pointer !important;
}
.active {
  color: #0088ca !important;
}
`;