import React, { useState } from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";

// MUI css
import {
  Button,
  Box,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";

// recoil
import { useRecoilValue } from "recoil";
import { addressState } from "../../recoil/address";

export default function UserGetPrivatekey() {
  const [open, setOpen] = useState(false);
  const privateKey = useRecoilValue(addressState);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Box>
      <Button variant="text" color="info" onClick={handleClickOpen}>
        개인키 내보내기
      </Button>
      <Dialog open={open} onClose={handleClose} sx={{ width: "100%" }}>
        <DialogTitle>개인키 내보내기</DialogTitle>
        <DialogContent>
          <DialogContentText>
            개인키는 안전한 곳에 보관하세요.
          </DialogContentText>
          <TextField
            id="standard-read-only-input"
            label="privateKey"
            defaultValue={privateKey.MATICPrivateKey}
            InputProps={{
              readOnly: true,
              endAdornment: (
                <CopyToClipboard text={privateKey.MATICPrivateKey}>
                  <ContentCopyIcon sx={{ cursor: "pointer" }} />
                </CopyToClipboard>
              ),
            }}
            variant="standard"
            sx={{ mt: "20px" }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>닫기</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
