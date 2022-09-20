import React, { useState, useEffect } from "react";
// import openWallet from "../image/ETH/with_Address.png";

// recoil
import { useRecoilState } from "recoil";
import { addressState } from "../recoil/address";

// MUI css
import { Box } from "@mui/material";
// import { Paper } from "@mui/material";

// component
import ImageChanger from "../component/ImageChanger";
import PrivateKeyToAccountButton from "../component/ETH/PrivateKeyToAccountButton";

// api
import { createAddress } from "../api/ethereum";

// const styles = {
//   paperContainer: {
//     backgroundImage: `url(${openWallet})`,
//   },
// };

export default function Ethereum() {
  const [stateAddress, setStateAddress] = useRecoilState(addressState);
  const [nonce, setNonce] = useState(0);
  const dumy = false;

  const handleClick = () => {
    if (nonce === 0) {
      const createResult = createAddress();
      setStateAddress({
        ETHAddress: createResult.address,
        ETHPrivateKey: createResult.privateKey,
      });
      setNonce(1);
      console.log("눌렀어");
    }
  };

  useEffect(() => {
    if (stateAddress) {
      console.log("어드레스 잇어", stateAddress);
    }
  }, [stateAddress]);

  return (
    <Box>
      {dumy ? (
        <Box>
          {/* <Paper style={styles.paperContainer}>
            Some text to fill the Paper Component
          </Paper> */}
          dfdf
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
