import React, { useEffect, useState, useCallback } from "react";

// MUI css
import { Box, Typography } from "@mui/material";

<<<<<<< HEAD
=======
// api
import { getBalance } from "../../api/ethereum";
import { getTxByAddress } from "../../api/common";

>>>>>>> 5532c8113a5d94d9e5fce826c399fe5ee27a4980
// recoil
import { useRecoilState, useRecoilValue } from "recoil";
import { addressState } from "../../recoil/address";
import { txState } from "../../recoil/tx";
<<<<<<< HEAD
// api
const { getBalance, getTxByAddress } = require("../../api/ethereum");
=======
import { chainState } from "../../recoil/chain";
>>>>>>> 5532c8113a5d94d9e5fce826c399fe5ee27a4980

export default function GetBalance() {
  const [account, setAccount] = useRecoilState(addressState);
  const [amount, setAmount] = useState(0);
  const [tx, setTx] = useRecoilState(txState);
  const chain = useRecoilValue(chainState);

  const handleGetTxList = useCallback(async () => {
    const prevTx = await getTxByAddress(account.ETHAddress, chain.SelectChain);

    if (prevTx) {
      if (prevTx.length > tx.ethTx.length) {
        setTx((prev) => ({
          ...prev,
          ethTx: prevTx,
        }));
      }
    }
  }, [account.ETHAddress, setTx, tx]);

  const handleGetBalance = useCallback(async () => {
    setAmount(await getBalance(account.ETHAddress));

    setAccount((prev) => ({
      ...prev,
      ETHBalance: amount,
    }));
  }, [account.ETHAddress, setAccount, amount]);

  useEffect(() => {
    handleGetBalance();
    if (tx.ethTx) {
      handleGetTxList();
    }
  }, [handleGetBalance, tx.ethTx, handleGetTxList]);

  return (
    <Box>
      <Box sx={{ display: "flex", justifyContent: "center", mt: "5%" }}>
        <Typography variant="h5">{amount} ETH(Goerli)</Typography>
      </Box>
    </Box>
  );
}
