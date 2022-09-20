import React from "react";

// MUI css
import { Box } from "@mui/material";

// component

export default function Main() {
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
            메인 페이지(밑에는 설명이 들어가야함)
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
