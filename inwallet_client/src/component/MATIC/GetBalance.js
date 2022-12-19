import React, { useEffect, useState, useCallback } from "react";

// MUI css
import { Box, Typography } from "@mui/material";

// api
import { getBalance, whichChain } from "../../api/web3";
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
    const prevTx = await getTxByAddress(
      account.MATICAddress,
      chain.SelectChain
    );

    if (prevTx) {
      if (prevTx.length > tx.maticTx.length) {
        setTx((prev) => ({
          ...prev,
          maticTx: prevTx,
        }));
      }
    }
  }, [account.MATICAddress, setTx, tx]);

  const handleGetBalance = useCallback(async () => {
    setAmount(await getBalance(account.MATICAddress));

    setAccount((prev) => ({
      ...prev,
      MATICBalance: amount,
    }));
  }, [account.MATICAddress, setAccount, amount]);

  useEffect(() => {
    whichChain(chain.SelectChain);
    handleGetBalance();
    if (tx.maticTx) {
      handleGetTxList();
    }
  }, [handleGetBalance, tx.maticTx, handleGetTxList]);

  return (
    <Box>
      <Box sx={{ display: "flex", justifyContent: "center", mt: "5%" }}>
        <Typography variant="h5">{amount} MATIC(Mumbai)</Typography>
      </Box>
    </Box>
  );
}
