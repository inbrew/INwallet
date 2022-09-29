import React, { useEffect, useCallback, useState } from "react";

// MUI css
import {
  Box,
  ListItem,
  ListItemText,
  Typography,
  Divider,
} from "@mui/material";

// recoil
import { useRecoilValue } from "recoil";
import { txState } from "../../recoil/tx";

// api
import { getTransaction } from "../../api/ethereum";

// component
// import DialogTransaction from "./DialogTransaction";

export default function TransactionListItem() {
  const transactions = useRecoilValue(txState);
  //   const address = useRecoilValue(addressState);
  const [addNewTransaction, setAddNewTransaction] = useState({
    tx: [],
  });

  const renderTransaction = (txs) => {
    if (txs.length > 0) {
      setAddNewTransaction((prev) => ({
        tx: txs,
      }));
    }
  };

  const handleEventTransaction = useCallback(async () => {
    if (transactions) {
      const resultGetTx = await getTransaction(transactions);

      if (resultGetTx) {
        renderTransaction(resultGetTx);
      }
    }
  }, [transactions]);

  useEffect(() => {
    handleEventTransaction();
  }, [handleEventTransaction, transactions]);

  //   console.log("그래서 여긴 뭐야?", addNewTransaction);
  return (
    <Box>
      {addNewTransaction.tx.length === 0 ? (
        <Box>
          <ListItem alignItems="flex-start">
            <ListItemText
              primary="최근 거래가 없습니다."
              secondary={
                <React.Fragment>
                  <Typography
                    sx={{ display: "inline" }}
                    component="span"
                    variant="body2"
                    color="text.primary"
                  ></Typography>
                </React.Fragment>
              }
            />
          </ListItem>
        </Box>
      ) : (
        <Box>
          {addNewTransaction.tx.map((el) => (
            <Box key={`Box ${el.transactionIndex}`}>
              <ListItem alignItems="flex-start" key={el.transactionIndex}>
                <ListItemText
                  primary={`To: ${el.to}`}
                  secondary={
                    <React.Fragment>
                      <Typography
                        sx={{ display: "inline" }}
                        component="span"
                        variant="body2"
                        color="text.primary"
                        key={el.transactionIndex}
                      >
                        Value: {el.value} ETH(Goerli)
                      </Typography>
                    </React.Fragment>
                  }
                />
              </ListItem>
              <Divider key={`Divider ${el.transactionIndex}`} />
            </Box>
          ))}
          {/* <DialogTransaction el={el} key={i} /> */}
        </Box>
      )}
    </Box>
  );
}
