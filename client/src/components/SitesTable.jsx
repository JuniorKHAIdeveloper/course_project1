import React from "react";
import { DataGrid } from "@mui/x-data-grid";


const SitesTable = () => {
  const [sites, setSites] = React.useState([]);

  const fetchSites = async () => {
    const response = await fetch("/site");
    const data = await response.json();

    setSites(data);
  };

  React.useEffect(() => {
    fetchSites();
  }, []);

  const columns = [
    { field: "siteName", headerName: "Назва", width: 150, editable: false },
    { field: "siteUrl", headerName: "Назва", width: 150, editable: false },
    { field: "siteSearchUrl", headerName: "Назва", width: 150, editable: false },
    { field: "containerSelector", headerName: "Назва", width: 150, editable: false },
    { field: "itemSelector", headerName: "Назва", width: 150, editable: false },
    { field: "imageSelector", headerName: "Назва", width: 150, editable: false },
    { field: "titleSelector", headerName: "Назва", width: 150, editable: false },
    { field: "authorSelector", headerName: "Назва", width: 150, editable: false },
    { field: "priceSelector", headerName: "Назва", width: 150, editable: false },
    { field: "availabelSelector", headerName: "Назва", width: 150, editable: false },
  ];

  return (
    <DataGrid
      rows={sites}
      columns={columns}
      getRowId={(row) => row._id}
      pageSize={10}
      rowsPerPageOptions={[5]}
      // checkboxSelection
      // disableSelectionOnClick
      // autoHeight
    />
  );
};

export default SitesTable;
