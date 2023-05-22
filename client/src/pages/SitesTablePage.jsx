import React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Button } from "@mui/material";
import Modal from "../core/Modal";

const SitesTable = ({ setAlert }) => {
  const [sites, setSites] = React.useState([]);
  const [selectedRows, setSelectedRows] = React.useState([]);
  const [editedProducts, setEditedProducts] = React.useState({});
  const [modalOpen, setModalOpen] = React.useState(false);

  const fetchSites = async () => {
    const response = await fetch("/site");
    const data = await response.json();

    setSites(data);
  };

  React.useEffect(() => {
    fetchSites();
  }, []);

  const handleDelete = () => {
    const data = { ids: selectedRows };
    fetch("/site", {
      method: "DELETE",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        if (res.ok) {
          fetchSites();
          setAlert({ type: "success", message: "Видалено успішно." });
        } else {
          return res.json().then((data) => data);
        }
      })
      .catch((e) => {
        setAlert({ type: "error", message: "Виникла помилка." });
        console.log(e);
      });
  };

  const columns = [
    {
      field: "siteName",
      headerName: "Назва ресурсу",
      width: 150,
      editable: true,
    },
    {
      field: "siteUrl",
      headerName: "Адреса ресурсу",
      width: 150,
      editable: true,
      renderCell: (params) => (
        <a href={params.value} target="_blank">
          {params.value}
        </a>
      ),
    },
    {
      field: "siteLogoUrl",
      headerName: "Логотип",
      width: 150,
      editable: true,
    },
    {
      field: "siteSearchUrl",
      headerName: "Адреса пошуку",
      width: 150,
      editable: true,
    },
    {
      field: "containerSelector",
      headerName: "Селектор контйнеру",
      width: 150,
      editable: true,
    },
    {
      field: "itemSelector",
      headerName: "Селектор елементу",
      width: 150,
      editable: true,
    },
    {
      field: "imageSelector",
      headerName: "Селектор картинки",
      width: 150,
      editable: true,
    },
    {
      field: "titleSelector",
      headerName: "Селектор назви",
      width: 150,
      editable: true,
    },
    {
      field: "authorSelector",
      headerName: "Селектор автора",
      width: 150,
      editable: true,
    },
    {
      field: "priceSelector",
      headerName: "Селектор ціни",
      width: 150,
      editable: true,
    },
    {
      field: "availabelSelector",
      headerName: "Селектор наявності",
      width: 150,
      editable: true,
    },
    {
      field: "bookUrlSelector",
      headerName: "Посилання на книгу",
      width: 150,
      editable: true,
    },
  ];

  const processRowUpdate = (newRow) => {
    const newObj = { ...editedProducts };
    newObj[newRow._id] = { ...newRow };
    setEditedProducts(newObj);
    return newRow;
  };

  const handleProcessRowUpdateError = (error) => {
    console.log(error);
  };

  const handleSave = () => {
    const editedProductsArray = [];
    for (const key in editedProducts) {
      editedProductsArray.push(editedProducts[key]);
    }

    const data = { productsToUpdateArray: editedProductsArray };

    fetch("/site", {
      method: "PUT",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        if (res.ok) {
          fetchSites();
          setAlert({ type: "success", message: "Збережено успішно." });
        }
      })
      .catch((e) => {
        setAlert({ type: "error", message: "Виникла помилка." });
        console.log(e);
      });
  };

  return (
    <>
      <DataGrid
        rows={sites}
        columns={columns}
        getRowId={(row) => row._id}
        initialState={{
          pagination: { paginationModel: { pageSize: 10 } },
        }}
        pageSizeOptions={[10, 20, 30]}
        checkboxSelection
        disableRowSelectionOnClick
        onRowSelectionModelChange={(ids) => {
          setSelectedRows(ids);
        }}
        experimentalFeatures={{ newEditingApi: true }}
        processRowUpdate={processRowUpdate}
        onProcessRowUpdateError={handleProcessRowUpdateError}
      />
      <Button
        variant="contained"
        color="success"
        onClick={handleSave}
        sx={{ my: 2, mr: 2 }}
      >
        Зберегти
      </Button>
      <Button
        variant="contained"
        color="error"
        onClick={() => setModalOpen(true)}
        sx={{ my: 2 }}
      >
        Видалити
      </Button>

      {modalOpen && (
        <Modal
          message={"Виділені сайти будуть видалені."}
          modalOpen={modalOpen}
          setModalOpen={setModalOpen}
          acceptHandler={handleDelete}
        />
      )}
    </>
  );
};

export default SitesTable;
