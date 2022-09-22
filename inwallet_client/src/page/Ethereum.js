import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

// recoil
import { useRecoilState } from "recoil";
import { addressState } from "../recoil/address";

// MUI css
import { Box } from "@mui/material";

// component
import ImageChanger from "../component/ImageChanger";
import PrivateKeyToAccountButton from "../component/ETH/PrivateKeyToAccountButton";
import INEthereum from "../component/ETH/INEthereum";

// api
import { createAddress } from "../api/ethereum";

export default function Ethereum() {
  const [stateAddress, setStateAddress] = useRecoilState(addressState);
  const [nonce, setNonce] = useState(0);
  const navigate = useNavigate();

  const handleClick = () => {
    if (nonce === 0) {
      const createResult = createAddress();
      setStateAddress({
        ETHAddress: createResult.address,
        ETHPrivateKey: createResult.privateKey,
      });
      setNonce(1);
      navigate("/INETH");
    }
  };

  return (
    <Box>
      {stateAddress.ETHAddress ? (
        <Box>
          <INEthereum />
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
              <Box onClick={handleClick}>
                <ImageChanger />
              </Box>
              <Box sx={{ display: "flex", justifyContent: "center" }}>
                <PrivateKeyToAccountButton />
              </Box>
            </Box>
          </Box>
        </Box>
      )}
    </Box>
  );
}
