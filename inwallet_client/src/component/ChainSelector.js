import React, { useState } from "react";
import { Box, FormControl, InputLabel, Select, MenuItem } from "@mui/material";

export default function ChainSelector() {
  const [chain, setChain] = useState("");
  const handleClick = (e) => {
    console.log(e.target.value);
  };

  return (
    <Box sx={{ display: "flex", justifyContent: "center", mb: "5%" }}>
      <Box sx={{ width: "50%" }}>
        <FormControl fullWidth variant="filled">
          <InputLabel>사용할 체인을 선택해주세요.</InputLabel>
          <Select value={chain} label="Chain" onChange={handleClick}>
            <MenuItem value={"Ethereum"}>Ethereum(ETH)</MenuItem>
            <MenuItem value={"Binance"}>Binance(BNB)</MenuItem>
            <MenuItem value={"Polygon"}>Polygon(MATIC)</MenuItem>
            <MenuItem value={"Klaytn"}>Klaytn(KLAY)</MenuItem>
            <MenuItem value={"Avalanche"}>Avalanche(AVAX)</MenuItem>
            <MenuItem value={"Stacks"}>Stacks(STX)</MenuItem>
            <MenuItem value={"Harmony"}>Harmony(ONE)</MenuItem>
          </Select>
        </FormControl>
      </Box>
    </Box>
  );
}
