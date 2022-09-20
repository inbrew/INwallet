import React from "react";
import { useNavigate } from "react-router-dom";
import { Box } from "@mui/material";
import logo from "../image/IN_Wallet_header.png";
import { useRecoilState } from "recoil";
import { addressState } from "../recoil/address";

export default function Header() {
  const [chain, setChain] = useRecoilState(addressState);
  const navigate = useNavigate();
  function handleClick() {
    setChain({
      SelectChain: "",
    });
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
