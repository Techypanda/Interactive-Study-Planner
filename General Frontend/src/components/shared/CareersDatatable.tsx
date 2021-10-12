import React from 'react';
import { DataGrid, GridColDef } from '@material-ui/data-grid';
import { useHistory } from "react-router-dom";

const columns: GridColDef[] = [
  { field: 'col1', headerName: 'Industry', flex:1},
  { field: 'col2', headerName: 'Career Name', flex:1 },
  { field: 'col3', headerName: 'Description', flex:5 },
];

export default function CareersDatatable(props: any) {
  const rows: any = [];
  const history = useHistory();

  props.items.forEach(function (item: any, index: any) {
      const id = item.CareerId || " ";
      const industry = item.Industry || " ";
      let name = item.Name || " ";
      name = name.charAt(0).toUpperCase() + name.slice(1);
      const description = item.Description || " ";
      const tableData = { id: id, col1: industry, col2: name, col3: description };
      rows.push(tableData);
  });

  return (
    <div style={{ height: '75vh', width: '100%' }}>
      <DataGrid rows={rows} columns={columns} onRowClick={ (event: any) => history.push(`/InfoPage/ViewCareer/${event.row.id}`) }/>
    </div>
  );
}