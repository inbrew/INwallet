import React, { useEffect, useState, useCallback } from "react";

// MUI css
import { Box, Typography } from "@mui/material";

// api
import { getBalance } from "../../api/ethereum";

// recoil
import { useRecoilState, useSetRecoilState } from "recoil";
import { addressState } from "../../recoil/address";
import { loadingState } from "../../recoil/loading";

export default function GetBalance() {
  const [account, setAccount] = useRecoilState(addressState);
  const setStateLoading = useSetRecoilState(loadingState);
  const [amount, setAmount] = useState(0);

  const handleGetBalance = useCallback(async () => {
    setStateLoading({
      isLoading: true,
    });

    setAmount(await getBalance(account.ETHAddress));

    setStateLoading({
      isLoading: false,
    });

    setAccount((prev) => ({
      ...prev,
      ETHBalance: amount,
    }));
  }, [account.ETHAddress, setAccount, setStateLoading, amount]);

  useEffect(() => {
    handleGetBalance();
  }, [handleGetBalance]);

  return (
    <Box>
      <Box sx={{ display: "flex", justifyContent: "center", mt: "5%" }}>
        <Typography variant="h5">{amount} ETH(Ropsten)</Typography>
      </Box>
    </Box>
  );
}
