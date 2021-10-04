import { SemesterOptionsTableProps, SemesterTableProps } from "../../types";
import { MenuItem, Table, TableBody, TableCell, TableHead, TableRow, TextField, Typography } from "@material-ui/core";
import styled from "styled-components";


function SemesterOptionsTable(props: SemesterOptionsTableProps) {
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
          <TableRow>
            <TableCell className="ur">
              <TextField
                id={`select-sem1-u1-${props.year}`}
                label="Select From Semester 1 Units"
                value={props.semSelectedOne[0] ? props.semSelectedOne[0].UnitCode : null}
                onChange={(e) => props.onChange(1, 0, e.target.value as string)}
                variant="outlined"
                className="selectUnit"
                select
                fullWidth
              >
                {props.semOne.map((u) =>
                  <MenuItem disabled={u.disabled} key={u.UnitCode} value={u.UnitCode}>{u.Name} - {u.UnitCode}</MenuItem>
                )}
              </TextField>
            </TableCell>
            <TableCell>
              <TextField
                id={`select-sem2-u1-${props.year}`}
                label="Select From Semester 2 Units"
                value={props.semSelectedTwo[0] ? props.semSelectedTwo[0].UnitCode : null}
                onChange={(e) => props.onChange(2, 0, e.target.value as string)}
                variant="outlined"
                className="selectUnit"
                select
                fullWidth
              >
                {props.semTwo.map((u) =>
                  <MenuItem disabled={u.disabled} key={u.UnitCode} value={u.UnitCode}>{u.Name} - {u.UnitCode}</MenuItem>
                )}
              </TextField>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="ur">
              <TextField
                id={`select-sem1-u2-${props.year}`}
                label="Select From Semester 1 Units"
                value={props.semSelectedOne[1] ? props.semSelectedOne[1].UnitCode : null}
                onChange={(e) => props.onChange(1, 1, e.target.value as string)}
                variant="outlined"
                className="selectUnit"
                select
                fullWidth
              >
                {props.semOne.map((u) =>
                  <MenuItem disabled={u.disabled} key={u.UnitCode} value={u.UnitCode}>{u.Name} - {u.UnitCode}</MenuItem>
                )}
              </TextField>
            </TableCell>
            <TableCell>
              <TextField
                id={`select-sem2-u2-${props.year}`}
                label="Select From Semester 2 Units"
                value={props.semSelectedTwo[1] ? props.semSelectedTwo[1].UnitCode : null}
                onChange={(e) => props.onChange(2, 1, e.target.value as string)}
                variant="outlined"
                className="selectUnit"
                select
                fullWidth
              >
                {props.semTwo.map((u) =>
                  <MenuItem disabled={u.disabled} key={u.UnitCode} value={u.UnitCode}>{u.Name} - {u.UnitCode}</MenuItem>
                )}
              </TextField>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="ur">
              <TextField
                id={`select-sem1-u3-${props.year}`}
                label="Select From Semester 1 Units"
                value={props.semSelectedOne[2] ? props.semSelectedOne[2].UnitCode : null}
                onChange={(e) => props.onChange(1, 2, e.target.value as string)}
                variant="outlined"
                className="selectUnit"
                select
                fullWidth
              >
                {props.semOne.map((u) =>
                  <MenuItem disabled={u.disabled} key={u.UnitCode} value={u.UnitCode}>{u.Name} - {u.UnitCode}</MenuItem>
                )}
              </TextField>
            </TableCell>
            <TableCell>
              <TextField
                id={`select-sem2-u3-${props.year}`}
                label="Select From Semester 2 Units"
                value={props.semSelectedTwo[2] ? props.semSelectedTwo[2].UnitCode : null}
                onChange={(e) => props.onChange(2, 2, e.target.value as string)}
                variant="outlined"
                className="selectUnit"
                select
                fullWidth
              >
                {props.semTwo.map((u) =>
                  <MenuItem disabled={u.disabled} key={u.UnitCode} value={u.UnitCode}>{u.Name} - {u.UnitCode}</MenuItem>
                )}
              </TextField>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="ur">
              <TextField
                id={`select-sem1-u4-${props.year}`}
                label="Select From Semester 1 Units"
                value={props.semSelectedOne[3] ? props.semSelectedOne[3].UnitCode : null}
                onChange={(e) => props.onChange(1, 3, e.target.value as string)}
                variant="outlined"
                className="selectUnit"
                select
                fullWidth
              >
                {props.semOne.map((u) =>
                  <MenuItem disabled={u.disabled} key={u.UnitCode} value={u.UnitCode}>{u.Name} - {u.UnitCode}</MenuItem>
                )}
              </TextField>
            </TableCell>
            <TableCell>
              <TextField
                id={`select-sem2-u4-${props.year}`}
                label="Select From Semester 2 Units"
                value={props.semSelectedTwo[3] ? props.semSelectedTwo[3].UnitCode : null}
                onChange={(e) => props.onChange(2, 3, e.target.value as string)}
                variant="outlined"
                className="selectUnit"
                select
                fullWidth
              >
                {props.semTwo.map((u) =>
                  <MenuItem disabled={u.disabled} key={u.UnitCode} value={u.UnitCode}>{u.Name} - {u.UnitCode}</MenuItem>
                )}
              </TextField>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  )
}

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

const styles = `
table {
  border: 2px solid #cc9900;
}
tr {
  border: 2px solid #cc9900;
}
.br {
  border - right: 2px solid #cc9900;
}
.ur {
  border - right: 2px solid #000;
}
td {
  height: 65px;
  overflow-y: scroll;
}
.selectUnit {
  width: 420px;
}      
.selectUnit label {
  color: #3285b6 !important;
}
`

export const SemTable = styled(SemesterTable)`
${styles}
`
export default styled(SemesterOptionsTable)`
${styles}
`;