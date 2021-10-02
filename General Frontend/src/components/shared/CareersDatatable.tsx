import React from 'react';
import { DataGrid, GridRowsProp, GridColDef } from '@material-ui/data-grid';
import { useHistory, useParams } from "react-router-dom";



export default function Datatable(props: any) {
  const rows: any = [];
  const history = useHistory();

  props.items.forEach(function (item: any, index: any) {
      const id = item.CareerId;
      const industry = item.Industry;
      const name = item.Name;
      const tableData = { id: id, col1: industry, col2: name };
      rows.push(tableData);
  });

  
  const columns: GridColDef[] = [
    { field: 'col1', headerName: 'Industry', width: 150},
    { field: 'col2', headerName: 'Career Name', width: 150 },
  ];


  return (
    <div style={{ height: 300, width: '100%' }}>
      <DataGrid rows={rows} columns={columns} onRowClick={ (event: any) => history.push(`/InfoPage/ViewCareer/${event.row.id}`) }/>
    </div>
  );
}