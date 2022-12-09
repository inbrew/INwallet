import React from "react";

// 라이브러리(클립보드 복사)
import { CopyToClipboard } from "react-copy-to-clipboard";

// MUI css
import { Box, TextField, Typography } from "@mui/material";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";

// recoil
import { useRecoilValue } from "recoil";
import { addressState } from "../../recoil/address";

// component
import UserGetPrivatekey from "./UserGetPrivatekey";
import GetBalance from "./GetBalance";
// import SendButton from "./SendButton";
// import TransactionList from "./TransactionList";

export default function INPolygon() {
  const account = useRecoilValue(addressState);
  return (
    <Box sx={{ display: "flex", justifyContent: "center" }}>
      <Box
        sx={{
          border: 5,
          width: "45%",
          padding: "2%",
          my: "3%",
          mr: "0.5%",
          ml: "3%",
          borderRadius: "3%",
        }}
      >
        <TextField
          id="standard-read-only-input"
          label="Address"
          defaultValue={account.MATICAddress}
          InputProps={{
            readOnly: true,
            endAdornment: (
              <CopyToClipboard text={account.MATICAddress}>
                <ContentCopyIcon sx={{ cursor: "pointer" }} />
              </CopyToClipboard>
            ),
          }}
          variant="standard"
          sx={{ width: "100%", mt: "20px" }}
        />
        <UserGetPrivatekey />
        <GetBalance />
        {/* <SendButton />  */}
      </Box>
      <Box
        sx={{
          border: 5,
          width: "45%",
          padding: "2%",
          my: "3%",
          ml: "0.5%",
          mr: "3%",
          borderRadius: "3%",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Box sx={{ display: "flex", justifyContent: "center", mb: "5%" }}>
          <Typography variant="h5">거래 내역</Typography>
        </Box>
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          {/* <TransactionList /> */}
        </Box>
      </Box>
    </Box>
  );
}
