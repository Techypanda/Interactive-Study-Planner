import React from 'react';
import { DataGrid, GridColDef } from '@material-ui/data-grid';
import { useHistory } from "react-router-dom";

const columns: GridColDef[] = [
  { field: 'col1', headerName: 'Unit Code', flex:0.75},
  { field: 'col2', headerName: 'Unit Name', flex:2 },
  { field: 'col3', headerName: 'Semester', flex:1 },
  { field: 'col4', headerName: 'Delivery', flex:1 },
];

export default function UnitsDataTable(props: any) {
  const rows: any = [];
  const history = useHistory();
  console.log(props.items);
  props.items.forEach(function (item: any, index: any) {
      const id = item.UnitCode || " ";
      // const industry = item.Industry || " ";
      let name = item.Name || " ";
      name = name.charAt(0).toUpperCase() + name.slice(1);
      // const description = item.Description || " ";
      let semester = item.Semester || " ";
      const delivery = item.Delivery;
      semester = semester.toString().split("");
      // const credits = item.Credits || " ";
      const tableData = { id: id, col1: id, col2: name, col3: semester, col4: delivery};
      rows.push(tableData);
  });

  return (
    <div style={{ height: '75vh', width: '100%' }}>
      <DataGrid rows={rows} columns={columns} onRowClick={ (event: any) => history.push(`/InfoPage/ViewUnit/${event.row.id}`) }/>
    </div>
  );
}

