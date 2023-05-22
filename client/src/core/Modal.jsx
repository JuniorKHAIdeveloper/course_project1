import React from "react";
import {
  Box,
  Button,
  Typography,
  Modal as MaterialModal,
  Grid,
} from "@mui/material";

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

const Modal = ({
  message,
  modalOpen: open,
  setModalOpen: setOpen,
  acceptHandler,
}) => {
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleAccept = () => {
    acceptHandler();
    setOpen(false);
  };

  return (
    <MaterialModal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography
          id="modal-modal-title"
          variant="h6"
          component="h2"
          sx={{ textAlign: "center" }}
        >
          Ви впевнені?
        </Typography>
        <Typography
          id="modal-modal-description"
          sx={{ mt: 2, textAlign: "center" }}
        >
          {message}
        </Typography>

        <Grid container justifyContent="space-around">
          <Grid item>
            <Button
              variant="contained"
              onClick={handleAccept}
              sx={{ my: 2, mr: 2 }}
              color="success"
            >
              Так
            </Button>
          </Grid>
          <Grid item>
            <Button
              variant="contained"
              onClick={handleClose}
              sx={{ my: 2 }}
              color="error"
            >
              Ні
            </Button>
          </Grid>
        </Grid>
      </Box>
    </MaterialModal>
  );
};

export default Modal;
