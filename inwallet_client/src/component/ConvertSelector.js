import React, { useState } from "react";

// MUI css
import { Box, Tabs, Tab } from "@mui/material";
import { PhoneIcon, FavoriteIcon } from "@mui/icons-material";

export default function ConvertSelector() {
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Tabs value={value} onChange={handleChange} aria-label="icon tabs example">
      <Tab icon={<PhoneIcon />} aria-label="phone" />
      <Tab icon={<FavoriteIcon />} aria-label="favorite" />
    </Tabs>
  );
}
