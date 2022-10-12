import React, { useEffect, useState, useCallback } from "react";

// MUI css
import { Box, Typography } from "@mui/material";

// api
import { getBalance } from "../../api/ethereum";
import { getTxByAddress } from "../../api/common";

// recoil
import { useRecoilState, useRecoilValue } from "recoil";
import { addressState } from "../../recoil/address";
import { txState } from "../../recoil/tx";
import { chainState } from "../../recoil/chain";

export default function GetBalance() {
  const [account, setAccount] = useRecoilState(addressState);
  const [amount, setAmount] = useState(0);
  const [tx, setTx] = useRecoilState(txState);
  const chain = useRecoilValue(chainState);

  const handleGetTxList = useCallback(async () => {
    const prevTx = await getTxByAddress(account.ETHAddress, chain.SelectChain);

    if (prevTx) {
      if (prevTx.length > tx.ethTx.length) {
        setTx({
          ethTx: prevTx,
        });
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
