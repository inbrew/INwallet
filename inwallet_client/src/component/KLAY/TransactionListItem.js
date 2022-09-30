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
import { useRecoilValue, useSetRecoilState } from "recoil";
import { txState } from "../../recoil/tx";
import { loadingState } from "../../recoil/loading";

// api
import { getTransactionReceipt } from "../../api/klaytn";

// component
// import DialogTransaction from "./DialogTransaction";

export default function TransactionListItem() {
  const transactions = useRecoilValue(txState);
  const setLoading = useSetRecoilState(loadingState);
  const [addNewTransaction, setAddNewTransaction] = useState({
    tx: [],
  });

  const renderTransaction = useCallback(
    (txs) => {
      if (txs.length > 0) {
        setAddNewTransaction((prev) => ({
          tx: txs,
        }));
        setLoading({
          isLoading: false,
        });
      }
      setLoading({
        isLoading: false,
      });
    },
    [setLoading]
  );

  const handleEventTransaction = useCallback(async () => {
    if (transactions.klayTx) {
      setLoading({
        isLoading: true,
      });
      const resultGetTx = await getTransactionReceipt(transactions.klayTx);

      if (resultGetTx) {
        renderTransaction(resultGetTx);
      }
    }
  }, [transactions, setLoading, renderTransaction]);

  useEffect(() => {
    handleEventTransaction();
  }, [handleEventTransaction, transactions.klayTx]);

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
          {addNewTransaction.tx.map((el, i) => (
            <Box key={`Box ${i}`}>
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
                        Value: {el.value} KLAY(baobab)
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
