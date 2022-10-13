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
  DialogActions,
} from "@mui/material";

// recoil
import { useRecoilValue, useSetRecoilState } from "recoil";
import { txState } from "../../recoil/tx";
import { loadingState } from "../../recoil/loading";

// api
import { getTransaction } from "../../api/ethereum";

export default function TransactionListItem() {
  const transactions = useRecoilValue(txState);
  const setLoading = useSetRecoilState(loadingState);
  const [addNewTransaction, setAddNewTransaction] = useState({
    tx: [],
  });
  const [modalData, setModalData] = useState(null);
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

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
    if (transactions.ethTx) {
      setLoading({
        isLoading: true,
      });

      const resultGetTx = await getTransaction(transactions.ethTx);

      if (resultGetTx) {
        renderTransaction(resultGetTx);
      }
    }
  }, [transactions, setLoading, renderTransaction]);

  useEffect(() => {
    handleEventTransaction();
  }, [handleEventTransaction, transactions.ethTx]);

  // console.log(modalData);

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
            <Box key={`Box ${i}`} onClick={handleClickOpen}>
              <ListItem
                alignItems="flex-start"
                key={el.transactionIndex}
                onClick={() => setModalData(el)}
                sx={{ cursor: "pointer" }}
              >
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
          <Dialog open={open} onClose={handleClose}>
            <DialogTitle>트랜잭션 영수증</DialogTitle>
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
                {modalData ? modalData.hash : null}
                <Typography variant="h6" sx={{ mt: "10px" }}>
                  Block Number
                </Typography>
                {modalData ? modalData.blockNumber : null}
                <Typography variant="h6" sx={{ mt: "10px" }}>
                  From (보낸 주소)
                </Typography>
                {modalData ? modalData.from : null}
                <Typography variant="h6" sx={{ mt: "10px" }}>
                  To (받는 주소)
                </Typography>
                {modalData ? modalData.to : null}
                <Typography variant="h6" sx={{ mt: "10px" }}>
                  거래 수수료(Gas Price)
                </Typography>
                {modalData ? modalData.gasPrice : null} ETH(Goerli)
                <Typography variant="h6" sx={{ mt: "10px" }}>
                  거래 가격(Value)
                </Typography>
                {modalData ? modalData.value : null} ETH(Goerli)
              </ListItem>
            </List>
          </Dialog>
        </Box>
      )}
    </Box>
  );
}
