import { Box, Paper, Typography } from "@material-ui/core";
import { useState } from "react";
import styled from "styled-components";
import MajorEntry from "./MajorEntry";

function PaginatedMajors(props: PaginatedMajorProps) {
  const [paginationCount] = useState(10);
  const [page, setPage] = useState(0);
  const pageLimit = props.majors.length / paginationCount === Infinity ? 0 : props.majors.length / paginationCount
  const pageIcons = () => {
    const rows = [];
    for (let x = 0; x < pageLimit; x++) {
      rows.push(x)
    }
    return rows;
  }
  return (
    <div className={props.className}>
      {props.majors.slice(paginationCount * page, Math.min((paginationCount * page) + paginationCount, props.majors.length)).map((major, _) =>
        <Box mb={1}>
          <MajorEntry major={major} />
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
export default styled(PaginatedMajors)`
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