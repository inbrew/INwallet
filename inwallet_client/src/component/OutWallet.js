import React from "react";
import outImage from "../image/OUT.png";
import { useNavigate } from "react-router-dom";

// recoil
import { useSetRecoilState } from "recoil";
import { addressState } from "../recoil/address";
import { chainState } from "../recoil/chain";
import { loadingState } from "../recoil/loading";

// MUI css
import { Box } from "@mui/material";

export default function OutWallet() {
  const outAddress = useSetRecoilState(addressState);
  const outChain = useSetRecoilState(chainState);
  const outLoading = useSetRecoilState(loadingState);

  const navigate = useNavigate();

  const handleOut = () => {
    outAddress({
      AVAXAddress: "",
      BNBAddress: "",
      ETHAddress: "",
      ETHPrivateKey: "",
      ETHBalance: 0,
      ONEAddress: "",
      KLAYAddress: "",
      MATICAddress: "",
      STXAddress: "",
    });

    outChain({
      SelectChain: "",
    });

    outLoading({
      isLoading: false,
    });

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
