import React from "react";
import { useNavigate } from "react-router-dom";

// MUI css
import { Box } from "@mui/material";

// recoil
import { useRecoilState } from "recoil";
import { addressState } from "../recoil/address";

// api
import { createAddress } from "../api/klaytn";

// component
import PrivateKeyToAccountButton from "../component/KLAY/PrivateKeyToAccountButton";
import ImageChanger from "../component/ImageChanger";
import INKlaytn from "../component/KLAY/INKlaytn";
// import TestButton from "../component/TestButton";

export default function Klaytn() {
  const [account, setAccount] = useRecoilState(addressState);
  const navigate = useNavigate();

  const handleClick = async () => {
    if (account.KLAYAddress.length === 0) {
      const createResult = await createAddress();

      setAccount((prev) => ({
        ...prev,
        KLAYAddress: createResult._address,
        KLAYPrivateKey: createResult._key.privateKey,
      }));
      navigate("/INKLAY");
    }
  };
  return (
    <Box>
      {account.KLAYAddress ? (
        <Box>
          <INKlaytn />
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
                width: "75%",
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
