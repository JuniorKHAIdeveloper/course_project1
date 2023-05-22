import React from "react";
import { Box, Modal as MaterialModal } from "@mui/material";
import SearchLoader from "../components/search/SearchLoader";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
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
