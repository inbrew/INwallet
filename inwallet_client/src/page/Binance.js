import React from "react";
import { useNavigate } from "react-router-dom";

// MUI css
import { Box } from "@mui/material";

// recoil
import { useRecoilState } from "recoil";
import { addressState } from "../recoil/address";

// api
import { createAddress } from "../api/binance";

// component
import PrivateKeyToAccountButton from "../component/BNB/PrivateKeyToAccountButton";
import ImageChanger from "../component/ImageChanger";
import INBinance from "../component/BNB/INBinance";

export default function Binance() {
  const [account, setAccount] = useRecoilState(addressState);
  const navigate = useNavigate();

  const handleClick = () => {
    if (account.BNBAddress.length === 0) {
      const createResult = createAddress();
      setAccount((prev) => ({
        ...prev,
        BNBAddress: createResult.address,
        BNBPrivateKey: createResult.privateKey,
      }));
      navigate("/INBNB");
    }
  };

  return (
    <Box>
      {account.BNBAddress ? (
        <Box>
          <INBinance />
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
                border: 5,
                width: 400,
                padding: "5%",
                borderRadius: "3%",
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
