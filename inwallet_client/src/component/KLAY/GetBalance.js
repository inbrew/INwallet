import React, { useEffect, useState, useCallback } from "react";

// MUI css
import { Box, Typography } from "@mui/material";

// api
import { getBalance, getTxByAddress } from "../../api/klaytn";

// recoil
import { useRecoilState } from "recoil";
import { addressState } from "../../recoil/address";
import { txState } from "../../recoil/tx";

export default function GetBalance() {
  const [account, setAccount] = useRecoilState(addressState);
  const [amount, setAmount] = useState(0);
  const [tx, setTx] = useRecoilState(txState);

  const handleGetTxList = useCallback(async () => {
    const prevTx = await getTxByAddress(account.KLAYAddress);

    if (tx.klayTx.length < prevTx.length) {
      setTx({
        klayTx: prevTx,
      });
    }
  }, [account.KLAYAddress, setTx, tx]);

  const handleGetBalance = useCallback(async () => {
    setAmount(await getBalance(account.KLAYAddress));

    setAccount((prev) => ({
      ...prev,
      KLAYBalance: amount,
    }));
  }, [account.KLAYAddress, setAccount, amount]);

  useEffect(() => {
    handleGetBalance();
    if (tx.klayTx) {
      handleGetTxList();
    }
  }, [handleGetBalance, tx.klayTx, handleGetTxList]);

  return (
    <Box>
      <Box sx={{ display: "flex", justifyContent: "center", mt: "5%" }}>
        <Typography variant="h5">{amount} KLAY(baobab)</Typography>
      </Box>
    </Box>
  );
}
