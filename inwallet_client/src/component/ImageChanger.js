import React from "react";
import { Box } from "@mui/material";
import { useRecoilState } from "recoil";
import { addressState } from "../recoil/address";

// ETH image
import ethereum from "../image/ETH/ethereum.png";

export default function ImageChanger() {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        mb: "5%",
        cursor: "pointer",
      }}
    >
      <img src={ethereum} width="auto" height="200px" />
    </Box>
  );
}
