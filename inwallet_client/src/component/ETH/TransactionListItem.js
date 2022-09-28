import React, { useEffect, useCallback, useState } from "react";

// MUI css
import {
  Box,
  ListItem,
  ListItemText,
  Typography,
  Divider,
  Dialog,
  DialogTitle,
  List,
} from "@mui/material";

// recoil
import { useRecoilValue } from "recoil";
import { txState } from "../../recoil/tx";

// api
import { getTransaction } from "../../api/ethereum";

export default function TransactionListItem() {
  const transactions = useRecoilValue(txState);
  //   const address = useRecoilValue(addressState);
  const [addNewTransaction, setAddNewTransaction] = useState({
    tx: [],
  });
  const [open, setOpen] = React.useState(false);

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

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    handleEventTransaction();
  }, [handleEventTransaction, transactions]);

  console.log(addNewTransaction.tx[0]);
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
            <Box
              key={`Box ${el.transactionIndex}`}
              onClick={handleClickOpen}
              sx={{ cursor: "pointer" }}
            >
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
              <Dialog onClose={handleClose} open={open}>
                <DialogTitle>
                  상세 트랜잭션 내역(esc를 눌러 닫아주세요)
                </DialogTitle>
                <List sx={{ pt: 0 }}>
                  <ListItem
                    autoFocus
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "flex-start",
                    }}
                  >
                    <Typography variant="h6" sx={{ mt: "10px" }}>
                      Transaction Hash
                    </Typography>
                    {el.hash}
                    <Typography variant="h6" sx={{ mt: "10px" }}>
                      Block Number
                    </Typography>
                    {el.blockNumber}
                    <Typography variant="h6" sx={{ mt: "10px" }}>
                      From (보낸 주소)
                    </Typography>
                    {el.from}
                    <Typography variant="h6" sx={{ mt: "10px" }}>
                      To (받는 주소)
                    </Typography>
                    {el.to}
                    <Typography variant="h6" sx={{ mt: "10px" }}>
                      거래 수수료(Gas Price)
                    </Typography>
                    {el.gasPrice} ETH(Goerli)
                    <Typography variant="h6" sx={{ mt: "10px" }}>
                      거래 가격(Value)
                    </Typography>
                    {el.value} ETH(Goerli)
                  </ListItem>
                </List>
              </Dialog>
            </Box>
          ))}
        </Box>
      )}
    </Box>
  );
}
