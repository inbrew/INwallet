import React from "react";
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
  const [account, setAccount] = useRecoilState(addressState);
  const navigate = useNavigate();

  // console.log("이더", account.ETHAddress.length);

  const handleClick = () => {
    if (account.ETHAddress.length === 0) {
      const createResult = createAddress();
      if (createResult) {
        setAccount((prev) => ({
          ...prev,
          ETHAddress: createResult.address,
          ETHPrivateKey: createResult.privateKey,
        }));
        navigate("/INETH");
      }
    }
  };

  // console.log("이게 없다는 거지?", account.ETHAddress);

  return (
    <Box>
      {account.ETHAddress ? (
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
