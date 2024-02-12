import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import Inner from "./Inner";
import DialogTitle from "@mui/material/DialogTitle";
import PropTypes from "prop-types";

const StartGame = ({ open, setOpen }) => {
  // const handleClickOpen = () => {
  //   setOpen(true);
  // };
  const handleClose = () => {
    setOpen(false);
  };
  return (
    <React.Fragment>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Lets get you started with a new game!"}
        </DialogTitle>
        <DialogContent>
          <Inner handleClose={handleClose} setOpen={setOpen} />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
};

StartGame.propTypes = {
  open: PropTypes.bool.isRequired,
  setOpen: PropTypes.func.isRequired,
};

export default StartGame;