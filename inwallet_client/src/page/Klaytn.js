import React from "react";

// MUI css
import { Box } from "@mui/material";

export default function Klaytn() {
  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              flexDirection: "column",
              border: 1,
              width: "75%",
              padding: "5%",
            }}
          >
            클레이튼
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
