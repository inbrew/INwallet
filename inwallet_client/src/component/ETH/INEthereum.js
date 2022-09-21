import React from "react";

// 라이브러리(클립보드 복사)
import { CopyToClipboard } from "react-copy-to-clipboard";

// MUI css
import { Box, TextField } from "@mui/material";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";

// recoil
import { useRecoilValue } from "recoil";
import { addressState } from "../../recoil/address";

export default function INEthereum() {
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
        <Box>Ethereum(Ropsten)</Box>

        <TextField
          id="standard-read-only-input"
          label="Address"
          defaultValue={account.ETHAddress}
          InputProps={{
            readOnly: true,
            endAdornment: (
              <CopyToClipboard text={account.ETHAddress}>
                <ContentCopyIcon sx={{ cursor: "pointer" }} />
              </CopyToClipboard>
            ),
          }}
          variant="standard"
          sx={{ width: "100%", mt: "20px" }}
        />
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
        }}
      ></Box>
    </Box>
  );
}
