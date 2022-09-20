import React, { useState } from "react";

// MUI css
import { Box } from "@mui/material";

// component
import ImageChanger from "../component/ImageChanger";

export default function Ethereum() {
  const [ethAddress, setEthAddress] = useState("");

  return (
    <Box>
      {ethAddress ? (
        <Box>
          <Box>{ethAddress}</Box>
        </Box>
      ) : (
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
              이더리움 주소만들기
              <ImageChanger />
            </Box>
          </Box>
        </Box>
      )}
    </Box>
  );
}
