import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Box, FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import { useRecoilState } from "recoil";
import { chainState } from "../recoil/chain";

export default function ChainSelector() {
  const navigate = useNavigate();
  const [chain, setChain] = useRecoilState(chainState);

  const handleClick = (e) => {
    setChain({
      SelectChain: e.target.value,
    });
  };

  useEffect(() => {
    if (chain.SelectChain !== "") {
      navigate(`/${chain.SelectChain}`);
    }
  }, [chain.SelectChain, navigate]);

  return (
    <Box sx={{ display: "flex", justifyContent: "center", mb: 3 }}>
      <Box sx={{ width: 400 }}>
        <FormControl fullWidth variant="standard">
          <InputLabel>사용할 체인에 IN 해주세요.</InputLabel>
          <Select
            value={chain.SelectChain}
            label="Chain"
            onChange={handleClick}
          >
            {/* <MenuItem value={"AVAX"}>Avalanche(AVAX)</MenuItem> */}
            <MenuItem value={"BNB"}>Binance(BNB)</MenuItem>
            <MenuItem value={"ETH"}>Ethereum(ETH)</MenuItem>
            {/* <MenuItem value={"ONE"}>Harmony(ONE)</MenuItem> */}
            <MenuItem value={"KLAY"}>Klaytn(KLAY)</MenuItem>
            {/* <MenuItem value={"MATIC"}>Polygon(MATIC)</MenuItem> */}
            {/* <MenuItem value={"STX"}>Stacks(STX)</MenuItem> */}
          </Select>
        </FormControl>
      </Box>
    </Box>
  );
}
