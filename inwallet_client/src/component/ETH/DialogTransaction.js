import React, { useState } from "react";

// MUI css
import {
  Box,
  List,
  Dialog,
  DialogTitle,
  ListItem,
  Typography,
} from "@mui/material";

// component

export default function DialogTransaction(el) {
  const [open, setOpen] = useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleClinkDialog = (el) => {
    console.log("이건가?", el);
  };
  return (
    <Box
      onClick={(handleClickOpen, handleClinkDialog)}
      sx={{ overflow: "auto", height: "300px" }}
    >
      <Dialog onClose={handleClose} open={open}>
        <DialogTitle>상세 트랜잭션 내역(esc를 눌러 닫아주세요)</DialogTitle>
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
  );
}
