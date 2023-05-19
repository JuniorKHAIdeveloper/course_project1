import React from "react";
import { Box, Button, Typography, Modal as MaterialModal, Grid } from "@mui/material";
import SearchLoader from "../components/search/SearchLoader";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  // border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const Loader = () => {

  return (
    <MaterialModal
      open={true}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <SearchLoader />
      </Box>
    </MaterialModal>
  );
};

export default Loader;
