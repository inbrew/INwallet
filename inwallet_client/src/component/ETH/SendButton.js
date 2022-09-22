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
} from "@mui/material";

// api
// import { getBalance } from "../../api/ethereum";

// // recoil
// import { useSetRecoilState } from "recoil";
// import { loadingState } from "../../recoil/loading";
// import { useRecoilValue } from "recoil";
// import { addressState } from "../../recoil/address";

export default function SendButton() {
  const [open, setOpen] = useState(false);
  //   const [amount, setAmount] = useState(0);
  //   const setStateLoading = useSetRecoilState(loadingState);
  //   let result;

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  //   const handleGetBalance = async (address) => {
  //     setStateLoading(true);
  //     result = await getBalance(address);
  //     setAmount(result);
  //     setStateLoading(false);
  //   };

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
            <DialogContentText>잔액 : 12312</DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="Private Key"
              type="email"
              fullWidth
              variant="standard"
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>취소</Button>
          </DialogActions>
        </Dialog>
      </Box>
    </Box>
  );
}
