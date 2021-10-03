import React from 'react';
import { DataGrid, GridRowsProp, GridColDef } from '@material-ui/data-grid';
import { useHistory, useParams } from "react-router-dom";
import { stringify } from 'querystring';

export default function UnitsDataTable(props: any) {
  const rows: any = [];
  const history = useHistory();
  console.log(props.items);
  props.items.forEach(function (item: any, index: any) {
      const id = item.UnitCode || " ";
      const industry = item.Industry || " ";
      let name = item.Name || " ";
      name = name.charAt(0).toUpperCase() + name.slice(1);
      const description = item.Description || " ";
      let semester = item.Semester || " ";
      const delivery = item.Delivery;
      semester = semester.toString().split("");
      const credits = item.Credits || " ";
      const tableData = { id: id, col1: id, col2: name, col3: semester, col4: delivery};
      rows.push(tableData);
  });

  const columns: GridColDef[] = [
    { field: 'col1', headerName: 'Unit Code', flex:0.75},
    { field: 'col2', headerName: 'Career Name', flex:2 },
    { field: 'col3', headerName: 'Semester', flex:1 },
    { field: 'col4', headerName: 'Delivery', flex:1 },
  ];


  return (
    <div style={{ height: '75vh', width: '100%' }}>
      <DataGrid rows={rows} columns={columns} onRowClick={ (event: any) => history.push(`/InfoPage/ViewUnit/${event.row.id}`) }/>
    </div>
  );
}

