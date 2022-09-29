import React, { useEffect, useState, useCallback } from "react";

// MUI css
import { Box, Typography } from "@mui/material";

// api
import { getBalance, getTxByAddress } from "../../api/binance";

// recoil
import { useRecoilState, useSetRecoilState } from "recoil";
import { addressState } from "../../recoil/address";
import { loadingState } from "../../recoil/loading";
import { txState } from "../../recoil/tx";

export default function GetBalance() {
  const [account, setAccount] = useRecoilState(addressState);
  const setStateLoading = useSetRecoilState(loadingState);
  const [amount, setAmount] = useState(0);
  const [tx, setTx] = useRecoilState(txState);

  const handleGetTxList = useCallback(async () => {
    const prevTx = await getTxByAddress(account.BNBAddress);

    if (prevTx.length > tx.length && prevTx) {
      setTx(prevTx);
    }
  }, [account.BNBAddress, setTx, tx.length]);

  const handleGetBalance = useCallback(async () => {
    setStateLoading({
      isLoading: true,
    });

    setAmount(await getBalance(account.BNBAddress));

    setStateLoading({
      isLoading: false,
    });

    setAccount((prev) => ({
      ...prev,
      BNBBalance: amount,
    }));
  }, [account.BNBAddress, setAccount, setStateLoading, amount]);

  useEffect(() => {
    if (tx) {
      handleGetBalance();

      handleGetTxList();
    }
  }, [handleGetBalance, tx, handleGetTxList]);

  return (
    <Box>
      <Box sx={{ display: "flex", justifyContent: "center", mt: "5%" }}>
        <Typography variant="h5">{amount} BNB(smart chain - test)</Typography>
      </Box>
    </Box>
  );
}
