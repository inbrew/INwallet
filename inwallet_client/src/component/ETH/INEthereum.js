import React from "react";

// MUI css
import { Box } from "@mui/material";

export default function INEthereum() {
  return (
    <Box sx={{ display: "flex", justifyContent: "center" }}>
      <Box
        sx={{
          border: 5,
          width: "45%",
          padding: "5%",
          my: "3%",
          mr: "0.5%",
          ml: "3%",
          height: "300px",
          borderRadius: "3%",
        }}
      >
        Ethereum(Ropsten)
      </Box>
      <Box
        sx={{
          border: 5,
          width: "45%",
          padding: "5%",
          my: "3%",
          ml: "0.5%",
          mr: "3%",
          height: "300px",
          borderRadius: "3%",
        }}
      ></Box>
    </Box>
  );
}
