import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

// MUI css
import { Box } from "@mui/material";

// recoil
import { useRecoilState } from "recoil";
import { addressState } from "../recoil/address";

// api
import { createAddress } from "../api/ethereum";

// component
import PrivateKeyToAccountButton from "../component/BNB/PrivateKeyToAccountButton";
import ImageChanger from "../component/ImageChanger";

export default function Binance() {
  const [account, setAccount] = useRecoilState(addressState);
  const [nonce, setNonce] = useState(0);
  const navigate = useNavigate();

  const handleClick = () => {
    if (nonce === 0) {
      const createResult = createAddress();
      setAccount((prev) => ({
        ...prev,
        [account.BNBAddress]: createResult.address,
        [account.BNBPrivateKey]: createResult.privateKey,
      }));
      setNonce(1);
      navigate("/INETH");
    }
  };

  return (
    <Box>
      {account.BNBAddress ? null : ( // </Box> //   <INEthereum /> // <Box>
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
