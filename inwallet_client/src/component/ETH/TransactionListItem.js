import React, { useEffect, useCallback, useState } from "react";

// MUI css
import { ListItem, ListItemText, Typography, Divider } from "@mui/material";

// recoil
import { useRecoilValue } from "recoil";
import { txState } from "../../recoil/tx";

// api
import { getTransaction } from "../../api/ethereum";

// 서버가 필요함. useCallback을 쓰면 setState가 재사용되면서 무한루프 돔

export default function TransactionListItem() {
  const transactions = useRecoilValue(txState);
  const [addNewTransaction, setAddNewTransaction] = useState({
    tx: [],
  });

  const handleEventTransaction = useCallback(async () => {
    if (transactions.tx) {
      const resultGetTx = await getTransaction(transactions.tx.transactionHash);

      if (addNewTransaction.tx.length === 0 && resultGetTx) {
        setAddNewTransaction(() => ({
          tx: [resultGetTx],
        }));
      } else {
        for (let i = 0; i < addNewTransaction.tx.length; i++) {
          if (
            resultGetTx.transactionIndex ===
            addNewTransaction.tx[i].transactionIndex
          ) {
            continue;
          } else {
            setAddNewTransaction((prev) => ({
              tx: [...prev.tx, resultGetTx],
            }));
          }
        }
      }

      //   console.log("트랜잭션 값은 불러져왔다. resultGetTx", resultGetTx);
    }
  }, [addNewTransaction.tx, transactions.tx]);

  //   console.log("이쪽 addNewTransaction", addNewTransaction.tx.length);

  useEffect(() => {
    handleEventTransaction();
  }, [handleEventTransaction, transactions]);

  return (
    <>
      {addNewTransaction.tx.length === 0 ? (
        <>
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
        </>
      ) : addNewTransaction.tx.length === 1 ? (
        <>
          {addNewTransaction.tx.map((el, i) => (
            <ListItem alignItems="flex-start" key={i}>
              <ListItemText
                primary={`Tx: ${el.hash}`}
                secondary={
                  <React.Fragment>
                    <Typography
                      sx={{ display: "inline" }}
                      component="span"
                      variant="body2"
                      color="text.primary"
                      key={i}
                    >
                      To: {el.to}
                    </Typography>
                    {" — I'll be in your neighborhood doing errands this…"}
                  </React.Fragment>
                }
              />
            </ListItem>
          ))}
        </>
      ) : (
        <>
          {addNewTransaction.tx.map((el, i) => (
            <>
              <ListItem alignItems="flex-start" key={i}>
                <ListItemText
                  primary={`Tx: ${el.hash}`}
                  secondary={
                    <React.Fragment>
                      <Typography
                        sx={{ display: "inline" }}
                        component="span"
                        variant="body2"
                        color="text.primary"
                        key={i}
                      >
                        To: {el.to}
                      </Typography>
                      {" — I'll be in your neighborhood doing errands this…"}
                    </React.Fragment>
                  }
                />
              </ListItem>
            </>
          ))}
          <Divider />
        </>
      )}
    </>
  );
}
