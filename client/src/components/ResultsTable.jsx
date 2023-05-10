import React from "react";
import { DataGrid } from "@mui/x-data-grid";

const ResultsTable = ({ results }) => {
  const columns = [
    {
      field: "image",
      headerName: "Зображення",
      flex: 1,
      editable: false,
      renderCell: (params) => (
        <img src={params.value} alt="Image" style={{ height: 200 }} />
      ),
    },
    { field: "source", headerName: "Назва ресурсу", flex: 1, editable: false },
    {
      field: "title",
      headerName: "Назва книги",
      flex: 1,

      editable: false,
    },
    {
      field: "author",
      headerName: "Автор",
      flex: 1,

      editable: false,
    },
    { field: "price", headerName: "Ціна", flex: 1, editable: false, type: "number", },
    {
      field: "available",
      headerName: "Наявність",
      flex: 1,

      editable: false,
    },
    {
      field: "bookUrl",
      headerName: "Посилання на книгу",
      flex: 1,
      editable: false,
      renderCell: (params) => (
        <a href={params.value} target="_blank">
          {params.value}
        </a>
      ),
    },
  ];

  return (
    <DataGrid
      rows={results}
      columns={columns}
      getRowId={(row) => row.source}
      initialState={{
        pagination: { paginationModel: { pageSize: 10 } },
      }}
      pageSizeOptions={[10, 20, 30]}
      rowHeight={200}
      // checkboxSelection
      disableRowSelectionOnClick
      sx={{
        "& .MuiDataGrid-cellContent": {
          whiteSpace: "normal",
          lineHeight: "normal",
        },
        "& .MuiDataGrid-cell>img": {
          margin: "0 auto",
        },
        "& .MuiDataGrid-cell>a": {
          whiteSpace: "normal",
          lineHeight: "normal",
        },
      }}
      // onRowSelectionModelChange={(ids) => {
      //   console.log(ids);
      //   setSelectedRows(ids);
      // }}
      // disableSelectionOnClick
      // autoHeight
    />
  );
};

export default ResultsTable;
