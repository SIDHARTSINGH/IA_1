import React from "react";
import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";

function App() {
  return (
    <Box display="flex" justifyContent="center" height="100vh">
      <Box width="50%">
        <Outlet />
      </Box>
    </Box>
  );
}

export default App;
