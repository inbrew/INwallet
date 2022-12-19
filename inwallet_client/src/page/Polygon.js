import React from "react";
import { useNavigate } from "react-router-dom";

// MUI css
import { Box } from "@mui/material";

// recoil
import { useRecoilState } from "recoil";
import { addressState } from "../recoil/address";

// component
import ImageChanger from "../component/ImageChanger";
import INPolygon from "../component/MATIC/INPolygon";
import PrivateKeyToAccountButton from "../component/MATIC/PrivateKeyToAccountButton";

// api
import { createAddress } from "../api/web3";

export default function Polygon() {
  const [account, setAccount] = useRecoilState(addressState);
  const navigate = useNavigate();

  const handleClick = async () => {
    if (account.MATICAddress.length === 0) {
      const createResult = await createAddress();
      setAccount((prev) => ({
        ...prev,
        MATICAddress: createResult.address,
        MATICPrivateKey: createResult.privateKey,
      }));
      navigate("/INMATIC");
    }
  };
  return (
    <Box>
      {account.MATICAddress ? (
        <Box>
          <INPolygon />
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
