import { useNavigate } from "react-router-dom";
import * as React from "react";
import Backdrop from "@mui/material/Backdrop";
import SpeedDial from "@mui/material/SpeedDial";
import SpeedDialIcon from "@mui/material/SpeedDialIcon";
import SpeedDialAction from "@mui/material/SpeedDialAction";
import HomeWorkIcon from "@mui/icons-material/HomeWork";
import AddIcon from "@mui/icons-material/Add";
import Box from "@mui/material/Box";
import StartGame from "./StartGame";
import GroupAddIcon from "@mui/icons-material/GroupAdd";

export default function SpeedDialTooltipOpen() {
  const [open, setOpen] = React.useState(false);
  const [alertOpen, setAlertOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const navigate = useNavigate();
  return (
    <>
      <Box
        sx={{
          transform: "translateZ(0px)",
          flexGrow: 1,
          position: "fixed",
          bottom: 0,
          right: 0,
          userSelect: "none",
        }}
      >
        <Backdrop open={open} />
        <SpeedDial
          ariaLabel="SpeedDial tooltip example"
          sx={{ position: "absolute", bottom: 16, right: 16 }}
          icon={<SpeedDialIcon />}
          onClose={handleClose}
          onOpen={handleOpen}
          open={open}
        >
          <SpeedDialAction
            icon={<GroupAddIcon />}
            tooltipTitle={"Join"}
            tooltipOpen
            onClick={() => {
              setAlertOpen(true);
              handleClose();
            }}
            style={{ cursor: "pointer" }}
          />
          <SpeedDialAction
            icon={<AddIcon />}
            tooltipTitle={"Match"}
            tooltipOpen
            onClick={() => {
              setAlertOpen(true);
              handleClose();
            }}
            style={{ cursor: "pointer" }}
          />
          <SpeedDialAction
            icon={<HomeWorkIcon />}
            tooltipTitle={"Home"}
            tooltipOpen
            onClick={() => {
              navigate("/");
              handleClose();
            }}
            style={{ cursor: "pointer" }}
          />
        </SpeedDial>
      </Box>
      <StartGame open={alertOpen} setOpen={setAlertOpen} />
    </>
  );
}
