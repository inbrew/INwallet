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

// recoil
// import { useSetRecoilState } from "recoil";
// import { loadingState } from "../../recoil/loading";
import { useRecoilValue } from "recoil";
import { addressState } from "../../recoil/address";

// api
import { isAddress } from "../../api/ethereum";

export default function SendButton() {
  const [open, setOpen] = useState(false);
  const [isCheck, setIsCheck] = useState(false);
  const account = useRecoilValue(addressState);
  let isValidAddress;

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setIsCheck(false);
  };

  const handleChangeAddress = (e) => {
    isValidAddress = isAddress(e.target.value);
    if (isValidAddress) {
      setIsCheck(true);
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
            <DialogContentText>
              잔액 : {account.ETHBalance} ETH(Ropsten)
            </DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="받을 주소"
              fullWidth
              variant="standard"
              onChange={handleChangeAddress}
            />

            <Slide direction="up" in={isCheck}>
              <Box>
                <TextField
                  autoFocus
                  margin="dense"
                  id="name"
                  label="받을 주소"
                  fullWidth
                  variant="standard"
                />
              </Box>
            </Slide>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>취소</Button>
          </DialogActions>
        </Dialog>
      </Box>
    </Box>
  );
}
