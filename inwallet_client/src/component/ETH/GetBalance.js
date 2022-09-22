import React, { useEffect, useState } from "react";

// MUI css
import { Box, Typography } from "@mui/material";

// api
import { getBalance } from "../../api/ethereum";

// recoil
import { useRecoilValue } from "recoil";
import { addressState } from "../../recoil/address";
import { useSetRecoilState } from "recoil";
import { loadingState } from "../../recoil/loading";

export default function GetBalance() {
  const account = useRecoilValue(addressState);
  const setStateLoading = useSetRecoilState(loadingState);
  const [amount, setAmount] = useState(0);
  let result;

  const handleGetBalance = async (address) => {
    setStateLoading(true);
    result = await getBalance(address);
    setAmount(result);
    setStateLoading(false);
  };

  useEffect(() => {
    handleGetBalance(account.ETHAddress);
    console.log("getBalance 함수 실행!");
  }, []);

  return (
    <Box>
      <Box sx={{ display: "flex", justifyContent: "center", mt: "5%" }}>
        <Typography variant="h4">{amount}</Typography>
      </Box>
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <Typography variant="h5">ETH(Ropsten)</Typography>
      </Box>
    </Box>
  );
}
