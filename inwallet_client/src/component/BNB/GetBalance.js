import React, { useEffect, useState, useCallback } from "react";

// MUI css
import { Box, Typography } from "@mui/material";

<<<<<<< HEAD
=======
// api
import { getBalance } from "../../api/binance";
import { getTxByAddress } from "../../api/common";

>>>>>>> 5532c8113a5d94d9e5fce826c399fe5ee27a4980
// recoil
import { useRecoilState, useRecoilValue } from "recoil";
import { addressState } from "../../recoil/address";
import { txState } from "../../recoil/tx";
<<<<<<< HEAD
// api
const { getBalance, getTxByAddress } = require("../../api/binance");
=======
import { chainState } from "../../recoil/chain";
>>>>>>> 5532c8113a5d94d9e5fce826c399fe5ee27a4980

export default function GetBalance() {
  const [account, setAccount] = useRecoilState(addressState);
  const [amount, setAmount] = useState(0);
  const [tx, setTx] = useRecoilState(txState);
  const chain = useRecoilValue(chainState);

  const handleGetTxList = useCallback(async () => {
    const prevTx = await getTxByAddress(account.BNBAddress, chain.SelectChain);

    if (prevTx) {
      if (tx.bnbTx.length < prevTx.length) {
        setTx((prev) => ({
          ...prev,
          bnbTx: prevTx,
        }));
      }
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
