import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
export default function CircularIndeterminate() {
  return (
    <Box 
    style={{ 
      position: "absolute",
      display: "flex", 
      justifyContent: "center",
      alignItems: "center",
      width: "100vw",
      height: "100vh",
      backgroundColor: "rgba(0, 0, 0, 0.5)",
      zindex: 1
    }}>
      <CircularProgress />
    </Box>
  );
}