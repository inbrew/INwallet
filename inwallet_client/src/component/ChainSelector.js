import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Box, FormControl, InputLabel, Select, MenuItem } from "@mui/material";

export default function ChainSelector() {
  const navigate = useNavigate();
  const [chain, setChain] = useState("");

  const handleClick = (e) => {
    setChain(e.target.value);
  };

  useEffect(() => {
    if (chain !== "") {
      navigate(`/${chain}`);
    }
  }, [chain, navigate]);

  return (
    <Box sx={{ display: "flex", justifyContent: "center", mb: "5%" }}>
      <Box sx={{ width: "50%" }}>
        <FormControl fullWidth variant="standard">
          <InputLabel>사용할 체인에 IN 해주세요.</InputLabel>
          <Select value={chain} label="Chain" onChange={handleClick}>
            <MenuItem value={"AVAX"}>Avalanche(AVAX)</MenuItem>
            <MenuItem value={"BNB"}>Binance(BNB)</MenuItem>
            <MenuItem value={"ETH"}>Ethereum(ETH)</MenuItem>
            <MenuItem value={"ONE"}>Harmony(ONE)</MenuItem>
            <MenuItem value={"KLAY"}>Klaytn(KLAY)</MenuItem>
            <MenuItem value={"MATIC"}>Polygon(MATIC)</MenuItem>
            <MenuItem value={"STX"}>Stacks(STX)</MenuItem>
          </Select>
        </FormControl>
      </Box>
    </Box>
  );
}
