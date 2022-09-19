import React from "react";
import { useNavigate } from "react-router-dom";
import { Box } from "@mui/material";
import logo from "../image/IN_Wallet_header.png";

export default function Header() {
  const navigate = useNavigate();
  function handleClick() {
    navigate("/");
  }

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        mb: "5%",
        cursor: "pointer",
      }}
    >
      <img
        src={logo}
        width="auto"
        height="200px"
        onClick={() => handleClick()}
      />
    </Box>
  );
}
