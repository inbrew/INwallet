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
import { useSetRecoilState } from "recoil";
import { loadingState } from "../../recoil/loading";
import { useRecoilValue } from "recoil";
import { addressState } from "../../recoil/address";

// api
import { isAddress } from "../../api/ethereum";

export default function SendButton() {
  const [open, setOpen] = useState(false);
  const [isCheck, setIsCheck] = useState(false);
  const [isError, setIsError] = useState(false);
  const account = useRecoilValue(addressState);
  const setLoading = useSetRecoilState(loadingState);
  let isValidAddress;

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
  };

  const handleChangeAddress = (e) => {
    setLoading({
      isLoading: true,
    });
    setIsError(true);
    isValidAddress = isAddress(e.target.value);
    if (isValidAddress) {
      setIsCheck(true);
      setLoading({
        isLoading: false,
      });
      setIsError(false);
    } else {
      setIsCheck(false);
    }
  };

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
              잔액 : {account.ETHBalance} ETH(Ropsten)
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
                <TextField
                  autoFocus
                  margin="dense"
                  id="name"
                  label="보낼 금액"
                  fullWidth
                  variant="standard"
                />
              </Box>
            </Slide>
          </DialogContent>
          <DialogActions>
            <Button>보내기</Button>
            <Button onClick={handleClose}>취소</Button>
          </DialogActions>
        </Dialog>
      </Box>
    </Box>
  );
}
