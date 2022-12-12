import React, { useState } from "react";

// MUI
import { ToggleButton, ToggleButtonGroup } from "@mui/material";
import { Receipt, Loyalty } from "@mui/icons-material";

export default function NFTorTransactionSeletor() {
  const [alignment, setAlignment] = useState("receipt");

  const handleChange = (event, newAlignment) => {
    setAlignment(newAlignment);
  };

  console.log(alignment);
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
