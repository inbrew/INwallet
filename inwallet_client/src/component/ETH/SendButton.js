import React, { useState } from "react";
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
import { useSetRecoilState, useRecoilValue } from "recoil";
import { loadingState } from "../../recoil/loading";
import { addressState } from "../../recoil/address";
import { txState } from "../../recoil/tx";

// api
import {
  isAddress,
  getGasPrice,
  sendTransaction,
  getNonce,
  gasLimit,
} from "../../api/ethereum";

export default function SendButton() {
  const [open, setOpen] = useState(false);
  const [isCheck, setIsCheck] = useState(false);
  const [isError, setIsError] = useState(false);
  const account = useRecoilValue(addressState);
  const setLoading = useSetRecoilState(loadingState);
  let isValidAddress;
  const [transactionOBJ, setTransactionOBJ] = useState({
    nonce: 0,
    from: account.ETHAddress,
    to: "",
    value: "",
    gasPrice: "",
    gasLimit: "",
  });
  const [isErrorValue, setIsErrorValue] = useState(false);
  const [isTransanctionProgress, setIsTransanctionProgress] = useState(false);
  const setTxState = useSetRecoilState(txState);
  // const resetTxstate = useResetRecoilState(txState);

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
      from: account.ETHAddress,
      to: "",
      value: "",
      gasPrice: "",
    });
    setIsTransanctionProgress(false);
    // resetTxstate();
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
    if (e.target.value > Number(account.ETHBalance) || e.target.value < 0) {
      setIsErrorValue(true);
    } else {
      setIsErrorValue(false);
      setTransactionOBJ((prev) => ({
        ...prev,
        value: e.target.value,
      }));
      let gasFee = await getGasPrice();
      let addressNonce = await getNonce(account.ETHAddress);
      let getGasLimit = await gasLimit({
        to: transactionOBJ.to,
        from: transactionOBJ.from,
        value: transactionOBJ.value,
      });

      if (gasFee && getGasLimit) {
        setTransactionOBJ((prev) => ({
          ...prev,
          nonce: addressNonce,
          value: e.target.value,
          gasPrice: gasFee,
          gasLimit: getGasLimit,
        }));
      }
    }
  };

  const handleSendTransaction = async () => {
    setLoading({
      isLoading: true,
    });
    setIsTransanctionProgress(true);
    // console.log("그럼 여기는?", transactionOBJ);
    const Tx = await sendTransaction(transactionOBJ, account.ETHPrivateKey);
    setOpen(false);
    // console.log(Tx);
    if (Tx) {
      setLoading({
        isLoading: false,
      });
      setTxState({
        tx: Tx,
      });
      handleClose();
    }
  };

  // console.log("현재 트랜잭션 상태는? ", transactionOBJ);
  // console.log("잘 바꼈을라나?", isTransaction);

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
          <DialogTitle>이더를 전송합니다.</DialogTitle>
          <DialogContent>
            <DialogContentText sx={{ mb: "5%" }}>
              잔액 : {account.ETHBalance} ETH(Goerli)
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
