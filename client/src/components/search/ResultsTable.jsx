import React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Checkbox, Typography } from "@mui/material";
import { FavoriteBorder, Favorite } from "@mui/icons-material";

const ResultsTable = ({ results: resultsNull, isAuth, isXsScreen }) => {
  const results = resultsNull.filter((item) => item !== null);
  const favoriteHandler = (book) => {
    const userId = localStorage.getItem("userId");
    const data = { userId, book };

    fetch("/book", {
      method: "PUT",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        if (res.ok) {
        } else {
          return res.json().then((data) => data);
        }
      })
      .catch((e) => {
        console.log(e);
      });
  };

  let additionalProps = {};

  if (isXsScreen) {
    additionalProps = { width: 150 };
  } else {
    additionalProps = { flex: 1 };
  }

  const columns = [
    {
      field: "image",
      headerName: "Зображення",

      editable: false,
      renderCell: (params) => (
        <div style={{ position: "relative" }}>
          <img src={params.value} alt="Image" style={{ height: 200 }} />
          {isAuth && (
            <Checkbox
              sx={{ position: "absolute", top: 0, left: 0 }}
              icon={<FavoriteBorder />}
              checkedIcon={<Favorite color="warning" />}
              onChange={() => favoriteHandler(params.row)}
            />
          )}
        </div>
      ),
      ...additionalProps,
    },
    {
      field: "source",
      headerName: "Назва ресурсу",

      editable: false,
      ...additionalProps,
    },
    {
      field: "title",
      headerName: "Назва книги",

      editable: false,
      ...additionalProps,
    },
    {
      field: "author",
      headerName: "Автор",

      editable: false,
      ...additionalProps,
    },
    {
      field: "price",
      headerName: "Ціна",

      editable: false,
      type: "number",
      align: "center",
      headerAlign: "left",
      ...additionalProps,
    },
    {
      field: "available",
      headerName: "Наявність",

      editable: false,
      ...additionalProps,
    },
    {
      field: "bookUrl",
      headerName: "Посилання на книгу",

      editable: false,
      renderCell: (params) => (
        <a href={params.value} target="_blank">
          Перейти
        </a>
      ),
      ...additionalProps,
    },
  ];

  const isAllResultsNull = resultsNull.every((result) => result === null);

  return (
    <>
      {!isAllResultsNull && (
        <DataGrid
          rows={results}
          columns={columns}
          getRowId={(row) => row.source}
          initialState={{
            pagination: { paginationModel: { pageSize: 10 } },
          }}
          pageSizeOptions={[10, 20, 30]}
          rowHeight={200}
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
        />
      )}
      {isAllResultsNull && (
        <Typography variant="h5" sx={{ textAlign: "center" }}>
          Вибачте, нічого не знайдено за Вашим запитом.
        </Typography>
      )}
    </>
  );
};

export default ResultsTable;
