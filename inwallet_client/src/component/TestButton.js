import React from "react";

// MUI css
import { Box, Button } from "@mui/material";

// test용 API
import { getTransactionReceipt, estimateGas } from "../api/klaytn";

import { useRecoilValue } from "recoil";
import { addressState } from "../recoil/address";
import { txState } from "../recoil/tx";

export default function Loading() {
  const tx = useRecoilValue(txState);
  const address = useRecoilValue(addressState);
  const handleClick = async () => {
    // createAddress();
    const result = await estimateGas();

    // console.log("트랜잭션 영수증", result);
    // console.log("주소", address);
  };
  return (
    <Box>
      <Button onClick={handleClick}>Test</Button>
    </Box>
  );
}
