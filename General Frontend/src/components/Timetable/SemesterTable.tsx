import { SemesterTableProps } from "../../types";
import { Table, TableBody, TableCell, TableHead, TableRow, Typography } from "@material-ui/core";
import styled from "styled-components";

function SemesterTable(props: SemesterTableProps) {
  const unitCount = Math.max(props.semesterOneUnits ? props.semesterOneUnits.length : 0, props.semesterTwoUnits ? props.semesterTwoUnits.length : 0)
  return (
    <div className={props.className}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell colSpan={2}>
              <Typography className="bold" variant="h6">Year {props.year}</Typography>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="br">Semester 1</TableCell>
            <TableCell>Semester 2</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {[...Array(unitCount)].map((_, i) =>
            <TableRow key={i}>
              <TableCell className="ur">{props.semesterOneUnits != null ?
                props.semesterOneUnits[i] != null ?
                `${props.semesterOneUnits[i].Name.toLowerCase().split(' ').map(word => word.charAt(0).toUpperCase() + word.substring(1)).join(' ')} - ${props.semesterOneUnits[i].UnitCode}`
                : ""
                : ""
              }</TableCell>
              <TableCell>{props.semesterTwoUnits != null ?
                props.semesterTwoUnits[i] != null ?
                `${props.semesterTwoUnits[i].Name.toLowerCase().split(' ').map(word => word.charAt(0).toUpperCase() + word.substring(1)).join(' ')} - ${props.semesterTwoUnits[i].UnitCode}`
                : ""
                : ""
              }</TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  )
}
export default styled(SemesterTable)`
table {
  border: 2px solid #cc9900;
}
tr {
  border: 2px solid #cc9900;
}
.br {
  border-right: 2px solid #cc9900;
}
.ur {
  border-right: 2px solid #000;
}
td {
  height: 45px;
  overflow-y: scroll;
}
`;