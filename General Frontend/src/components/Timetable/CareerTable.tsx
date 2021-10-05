import { Table, TableBody, TableCell, TableHead, TableRow, Typography } from "@material-ui/core";
import { useHistory } from "react-router";
import styled from "styled-components";
import { CareerTableProps } from "../../types";

function CareerTable(props: CareerTableProps) {
  const history = useHistory()
  return (
    <div className={props.className}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell colSpan={1} className="careerTitleColumn br">
              <Typography className="bold" variant="h6">Available Careers</Typography>
            </TableCell>
            <TableCell colSpan={4}>
              <Typography className="bold" variant="h6">Career Description</Typography>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {props.careers.map((career) =>
            <TableRow key={career.CareerId}>
              <TableCell className="br">
                <Typography variant="h6" className="careerTitle" onClick={() => history.push(`/InfoPage/ViewCareer/${career.CareerId}`)}>{career.Name}</Typography>
              </TableCell>
              <TableCell>{career.Description}</TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  )
}
export default styled(CareerTable)`
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
.careerTitleColumn {
  max-width: 200px;
  width: 200px;
}
.careerTitle {
  color: #3285b6 !important;
  cursor: pointer;
}
`;