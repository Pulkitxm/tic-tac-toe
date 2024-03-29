import * as React from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import StepContent from "@mui/material/StepContent";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import ReplayIcon from "@mui/icons-material/Replay";
import { uniqueNamesGenerator, starWars } from "unique-names-generator";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setUsername, setGameMode } from "../../../state/newGame";
import PropTypes from "prop-types";
import { hideLoader, showLoader } from "../../../state/loader";
import io from "socket.io-client";
import { CircularProgress } from "@mui/material";
export default function VerticalLinearStepper({ handleClose, setOpen }) {
  const naigate = useNavigate();
  const [load, setLoad] = React.useState();
  const [activeStep, setActiveStep] = React.useState(0);
  const newGameState = useSelector((state) => state.newGame);
  const dispatch = useDispatch();
  const newGame = useSelector((state) => state.newGame);
  const [fetchedData, setFetchedData] = React.useState(false);
  React.useEffect(() => {
    if (!fetchedData) {
      const socket = io("http://localhost:3000/");
      if (activeStep === 1) {
        setLoad(true);
        socket.emit("want-to-play", {
          messgae: "i want to play",
          username: newGame.username,
        });
        socket.on("new-user", (data) => {
          if (data.username !== newGame.username) {
            setLoad(false);
            setOpen(false);
            naigate("/start?opponent=" + data.username);
            setFetchedData(true);
            socket.emit("lets-join", {
              username: newGame.username,
            });
          }
        });
        socket.on("join-room", (data) => {
          setLoad(false);
          setOpen(false);
          naigate("/start?opponent=" + data.username);
        });
      }
    }
  }, [activeStep]);
  const changeUsername = (username) => {
    dispatch(setUsername(username));
  };
  const changeGameMode = (mode) => {
    dispatch(setGameMode(mode));
  };

  const config = {
    dictionaries: [starWars],
  };

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  return (
    <Box sx={{ maxWidth: 400 }}>
      <Stepper activeStep={activeStep} orientation="vertical">
        <Step key="Enter your username">
          <StepLabel>Enter your username</StepLabel>
          <StepContent>
            <div
              style={{
                display: "flex",
                alignItems: "center",
              }}
            >
              <TextField
                id="filled-basic"
                label="Filled"
                variant="filled"
                value={newGameState.username}
                onChange={(e) => changeUsername(e.target.value)}
              />
              <ReplayIcon
                onClick={() => {
                  changeUsername("");
                  dispatch(setUsername(uniqueNamesGenerator(config)));
                }}
                style={{
                  cursor: "pointer",
                  marginLeft: "10px",
                }}
              />
            </div>
            <Box sx={{ mb: 2 }}>
              <div>
                <Button
                  variant="contained"
                  onClick={() => {
                    if (newGameState.username.length > 0) handleNext();
                  }}
                  sx={{
                    mt: 1,
                    mr: 1,
                    backgroundColor:
                      newGameState.username.length > 0 ? "green" : "#616161",
                    "&:hover": {
                      backgroundColor:
                        newGameState.username.length > 0 ? "green" : "#616161",
                    },
                  }}
                >
                  Continue
                </Button>
              </div>
            </Box>
          </StepContent>
        </Step>
        <Step key="Choose your game mode">
          <StepLabel>{"Let's find you some Online Players"}</StepLabel>
          <StepContent>{load && <CircularProgress />}</StepContent>
        </Step>
      </Stepper>
    </Box>
  );
}

VerticalLinearStepper.propTypes = {
  handleClose: PropTypes.func.isRequired,
  setOpen: PropTypes.func.isRequired,
};
