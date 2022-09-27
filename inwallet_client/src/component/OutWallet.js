import React from "react";
import outImage from "../image/OUT.png";
import { useNavigate } from "react-router-dom";

// recoil
import { useResetRecoilState } from "recoil";
import { addressState } from "../recoil/address";
import { chainState } from "../recoil/chain";
import { loadingState } from "../recoil/loading";
import { txState } from "../recoil/tx";

// MUI css
import { Box } from "@mui/material";

export default function OutWallet() {
  const outAddress = useResetRecoilState(addressState);
  const outChain = useResetRecoilState(chainState);
  const outLoading = useResetRecoilState(loadingState);
  const outTx = useResetRecoilState(txState);

  const navigate = useNavigate();

  const handleOut = () => {
    outAddress();

    outChain();

    outLoading();
    outTx();
    console.log("초기화됨");
    navigate("/");
  };

  return (
    <Box sx={{ display: "flex", justifyContent: "center" }}>
      <Box sx={{ cursor: "pointer" }}>
        <img
          src={outImage}
          width="100px"
          height="auto"
          alt="outWalletImage"
          onClick={() => handleOut()}
        />
      </Box>
    </Box>
  );
}
