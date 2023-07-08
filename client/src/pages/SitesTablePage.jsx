import React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Button } from "@mui/material";
import Modal from "../core/Modal";
import ExportModal from "../components/sites-table/ExportModal";
import { AppContext } from "../App";
import ImportModal from "../components/sites-table/ImportModal";

const SitesTable = ({ setAlert }) => {
  const [sites, setSites] = React.useState([]);
  const [selectedRows, setSelectedRows] = React.useState([]);
  const [editedProducts, setEditedProducts] = React.useState({});
  const [modalOpen, setModalOpen] = React.useState(false);
  const [importModalOpen, setImportModalOpen] = React.useState(false);
  const [exportModalOpen, setExportModalOpen] = React.useState(false);
  const { type, file, setFile } = React.useContext(AppContext);

  const fetchSites = async () => {
    const response = await fetch("/site");
    const data = await response.json();

    setSites(data);
  };

  const handleExport = async (dataType) => {
    const data = {
      type: dataType,
    };

    fetch("/export", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        const contentType = response.headers.get("Content-Type");
        if (contentType.includes("application/json")) {

          return response.json();
        } else if (contentType.includes("text/csv")) {

          return response.blob();
        } else if (contentType.includes("application/vnd.ms-excel")) {
          // Handle Excel file
          return response.blob();
        } else {
          throw new Error("Invalid response content type");
        }
      })
      .then((data) => {
        if (!data?.type && Array.isArray(data)) {
          const jsonContent = JSON.stringify(data, null, 2);
          const blob = new Blob([jsonContent], { type: "application/json" });
          const url = URL.createObjectURL(blob);
          const link = document.createElement("a");
          link.href = url;
          link.setAttribute("download", "data.json");
          document.body.appendChild(link);
          link.click();
          URL.revokeObjectURL(url); // Clean up the created object URL
        } else if (data?.type && data.type.includes("text/csv")) {
          const url = URL.createObjectURL(data);
          const link = document.createElement("a");
          link.href = url;
          link.setAttribute("download", "data.csv");
          document.body.appendChild(link);
          link.click();
          URL.revokeObjectURL(url); // Clean up the created object URL
        } else if (
          data?.type &&
          data.type.includes("application/vnd.ms-excel")
        ) {
          // Handle Excel file
          const url = URL.createObjectURL(data);
          const link = document.createElement("a");
          link.href = url;
          link.setAttribute("download", "data.xls");
          document.body.appendChild(link);
          link.click();
          URL.revokeObjectURL(url); // Clean up the created object URL
        } else {
          throw new Error("Invalid response content type");
        }
      })
      .catch((error) => {
        console.error("Error downloading file:", error);
      });
  };

  const handleImport = async (file) => {
    if (file) {
    const formData = new FormData();
    formData.append("file", file);

    fetch("/import", {
      method: "POST",
      body: formData,
    })
      .then((response) => {
        if (response.ok) {
          // Handle response or further actions
          console.log("File uploaded successfully");
          setFile(null);
          fetchSites();
        } else {
          // Handle error
          console.error("Error uploading file:", response.statusText);
        }
      })
      .catch((error) => {
        // Handle error
        console.error("Error uploading file:", error);
      });
    } else {
      setAlert({ type: "error", message: "Файл не обрано." });
    }
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
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <div>
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
        </div>
        <div>
          <Button
            variant="contained"
            color="success"
            onClick={() => setExportModalOpen(true)}
            sx={{ my: 2, mr: 2 }}
          >
            Експорт бд
          </Button>
          <Button
            variant="contained"
            color="success"
            onClick={() => setImportModalOpen(true)}
            sx={{ my: 2, mr: 2 }}
          >
            Імпорт бд
          </Button>
        </div>
      </div>

      {modalOpen && (
        <Modal
          message={"Виділені сайти будуть видалені."}
          modalOpen={modalOpen}
          setModalOpen={setModalOpen}
          acceptHandler={handleDelete}
        />
      )}

      {exportModalOpen && (
        <Modal
          header="Оберіть формат файлу:"
          message={<ExportModal />}
          modalOpen={exportModalOpen}
          setModalOpen={setExportModalOpen}
          acceptHandler={() => handleExport(type)}
          acceptButtonText="Завантажити"
          declineButtonText="Скасувати"
        />
      )}

      {importModalOpen && (
        <Modal
          showHeader={false}
          message={<ImportModal />}
          modalOpen={importModalOpen}
          setModalOpen={setImportModalOpen}
          acceptHandler={() => handleImport(file)}
          acceptButtonText="Завантажити"
          declineButtonText="Скасувати"
        />
      )}
    </>
  );
};

export default SitesTable;
