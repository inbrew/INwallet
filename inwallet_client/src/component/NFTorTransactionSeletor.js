import React, { useState } from "react";

// MUI
import { ToggleButton, ToggleButtonGroup } from "@mui/material";
import { Receipt, Loyalty } from "@mui/icons-material";

// recoil
import { useRecoilState } from "recoil";
import { receiptOrNft } from "../recoil/receiptOrNft";

export default function NFTorTransactionSeletor() {
  const [alignment, setAlignment] = useRecoilState(receiptOrNft);

  const handleChange = (event, newAlignment) => {
    setAlignment({ whichSelect: newAlignment });
  };

  return (
    <ToggleButtonGroup
      color="primary"
      value={alignment}
      exclusive
      onChange={handleChange}
      aria-label="Platform"
    >
      <ToggleButton value="receipt">
        <Receipt />
      </ToggleButton>
      <ToggleButton value="nft">
        <Loyalty />
      </ToggleButton>
    </ToggleButtonGroup>
  );
}
