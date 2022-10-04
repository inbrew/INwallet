import React, { useEffect, useState, useCallback } from "react";

// MUI css
import { Box, Typography } from "@mui/material";

// recoil
import { useRecoilState } from "recoil";
import { addressState } from "../../recoil/address";
import { txState } from "../../recoil/tx";
// api
const { getBalance, getTxByAddress } = require("../../api/binance");

export default function GetBalance() {
  const [account, setAccount] = useRecoilState(addressState);
  const [amount, setAmount] = useState(0);
  const [tx, setTx] = useRecoilState(txState);

  const handleGetTxList = useCallback(async () => {
    const prevTx = await getTxByAddress(account.BNBAddress);

    if (tx.bnbTx.length < prevTx.length) {
      setTx({
        bnbTx: prevTx,
      });
    }
  }, [account.BNBAddress, setTx, tx]);

  const handleGetBalance = useCallback(async () => {
    setAmount(await getBalance(account.BNBAddress));

    setAccount((prev) => ({
      ...prev,
      BNBBalance: amount,
    }));
  }, [account.BNBAddress, setAccount, amount]);

  useEffect(() => {
    handleGetBalance();
    if (tx.bnbTx) {
      handleGetTxList();
    }
  }, [handleGetBalance, tx.bnbTx, handleGetTxList]);

  return (
    <Box>
      <Box sx={{ display: "flex", justifyContent: "center", mt: "5%" }}>
        <Typography variant="h5">{amount} BNB(smart chain - test)</Typography>
      </Box>
    </Box>
  );
}
