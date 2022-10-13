import React, { useState, useCallback } from "react";
import sendMoneyImage from "../../image/sendMoney.png";

// MUI css
import {
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
  Button,
  Slide,
} from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { green } from "@mui/material/colors";

// recoil
import { useSetRecoilState, useRecoilValue, useRecoilState } from "recoil";
import { loadingState } from "../../recoil/loading";
import { addressState } from "../../recoil/address";
import { txState } from "../../recoil/tx";
import { chainState } from "../../recoil/chain";

// api
import { isAddress, estimateGas, sendRawTransaction } from "../../api/klaytn";
import { getTxByAddress } from "../../api/common";

export default function SendButton() {
  const [open, setOpen] = useState(false);
  const [isCheck, setIsCheck] = useState(false);
  const [isError, setIsError] = useState(false);
  const [account, setAccount] = useRecoilState(addressState);
  const setLoading = useSetRecoilState(loadingState);
  let isValidAddress;
  const [transactionOBJ, setTransactionOBJ] = useState({
    from: account.KLAYAddress,
    to: "",
    value: "",
    gas: "",
  });
  const [isErrorValue, setIsErrorValue] = useState(false);
  const [isTransanctionProgress, setIsTransanctionProgress] = useState(false);
  const [nowTx, setTx] = useRecoilState(txState);
  const chain = useRecoilValue(chainState);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setIsCheck(false);
    setLoading({
      isLoading: false,
    });
    setIsError(false);
    setIsErrorValue(false);
    setTransactionOBJ({
      from: account.KLAYAddress,
      to: "",
      value: "",
      gas: "",
    });
    setIsTransanctionProgress(false);
  };

  const handleChangeAddress = (e) => {
    setLoading({
      isLoading: true,
    });
    setIsError(true);
    isValidAddress = isAddress(e.target.value);
    if (isValidAddress) {
      setTransactionOBJ((prev) => ({
        ...prev,
        to: e.target.value,
      }));
      setIsCheck(true);
      setLoading({
        isLoading: false,
      });
      setIsError(false);
    } else {
      setIsCheck(false);
    }
  };

  const handleChangeValue = async (e) => {
    if (e.target.value > Number(account.KLAYBalance) || e.target.value < 0) {
      setIsErrorValue(true);
    } else {
      setIsErrorValue(false);
      setTransactionOBJ((prev) => ({
        ...prev,
        value: e.target.value,
      }));

      let gasFee = await estimateGas(transactionOBJ.to);

      if (gasFee) {
        setTransactionOBJ((prev) => ({
          ...prev,
          value: e.target.value,
          gas: 25000,
        }));
      }
    }
  };

  const handleSendTransaction = async () => {
    setLoading({
      isLoading: true,
    });
    setIsTransanctionProgress(true);

    const Tx = await sendRawTransaction(transactionOBJ, account.KLAYPrivateKey);
    setOpen(false);

    if (Tx) {
      setLoading({
        isLoading: false,
      });
      handleGetTxList();
      handleClose();
    }
  };

  const handleGetTxList = useCallback(async () => {
    const prevTx = await getTxByAddress(account.KLAYAddress, chain.SelectChain);
    // console.log("api로 불러온 tx들", prevTx);
    if (prevTx) {
      setTx((prev) => ({
        ...prev,
        klayTx: prevTx,
      }));
    }
  }, [account.KLAYAddress, setTx, nowTx]);

  return (
    <Box sx={{ display: "flex", justifyContent: "center", mt: "3%" }}>
      <Box sx={{ cursor: "pointer" }}>
        <img
          src={sendMoneyImage}
          width="40px"
          height="auto"
          onClick={handleClickOpen}
          alt="sendMoneyImage"
        />
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>클레이를 전송합니다.</DialogTitle>
          <DialogContent>
            <DialogContentText sx={{ mb: "5%" }}>
              잔액 : {account.KLAYBalance} KLAY(baobab)
            </DialogContentText>

            {isError ? (
              <TextField
                error
                id="standard-error-helper-text"
                label="받을 주소가 올바르지 않습니다."
                fullWidth
                helperText="유효한 주소인지 확인해주세요."
                variant="standard"
                onChange={handleChangeAddress}
              />
            ) : isCheck ? (
              <TextField
                autoFocus
                margin="dense"
                id="standard-read-only-input"
                label="받을 주소"
                fullWidth
                variant="standard"
                InputProps={{
                  readOnly: true,
                  endAdornment: <CheckCircleIcon sx={{ color: green[500] }} />,
                }}
              />
            ) : (
              <TextField
                autoFocus
                margin="dense"
                id="name"
                label="받을 주소"
                fullWidth
                variant="standard"
                onChange={handleChangeAddress}
              />
            )}

            <Slide direction="up" in={isCheck}>
              <Box>
                {isErrorValue ? (
                  <TextField
                    error
                    autoFocus
                    margin="dense"
                    id="standard-number"
                    label="금액이 올바르지 않습니다."
                    type="number"
                    fullWidth
                    variant="standard"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    onChange={handleChangeValue}
                  />
                ) : !isTransanctionProgress ? (
                  <TextField
                    autoFocus
                    margin="dense"
                    id="standard-number"
                    label="보낼 금액"
                    type="number"
                    fullWidth
                    variant="standard"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    onChange={handleChangeValue}
                  />
                ) : (
                  <TextField
                    autoFocus
                    margin="dense"
                    id="standard-read-only-input"
                    label="보낼 금액 : 거래 진행 중"
                    fullWidth
                    variant="standard"
                    InputProps={{
                      readOnly: true,
                      endAdornment: (
                        <CheckCircleIcon sx={{ color: green[500] }} />
                      ),
                    }}
                  />
                )}
              </Box>
            </Slide>
          </DialogContent>
          <DialogActions>
            {isTransanctionProgress ? null : isCheck ? (
              <Box>
                <Button onClick={handleSendTransaction}>보내기</Button>
                <Button onClick={handleClose}>취소</Button>
              </Box>
            ) : (
              <Box>
                <Button onClick={handleClose}>취소</Button>
              </Box>
            )}
          </DialogActions>
        </Dialog>
      </Box>
    </Box>
  );
}
