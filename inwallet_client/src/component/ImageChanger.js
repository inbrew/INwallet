import React, { useState } from "react";
import { Box } from "@mui/material";
import { useRecoilValue } from "recoil";
import { addressState } from "../recoil/address";

// ETH image
import ethereum from "../image/ETH/ethereum.png";
import INethereum from "../image/ETH/IN_ethereum.png";

export default function ImageChanger() {
  const [hoverState, setHoverState] = useState(false);
  const nowChain = useRecoilValue(addressState);
  let nowImage = null;
  let nowHoverImage = null;

  // 현재 체인상태에 따라 출력 변경
  if (nowChain.SelectChain === "ETH") {
    nowImage = ethereum;
    nowHoverImage = INethereum;
  }

  const handleHoverIn = () => {
    setHoverState(true);
  };

  const handleHoverOut = () => {
    setHoverState(false);
  };

  return (
    <Box>
      {hoverState ? (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            mb: "5%",
            cursor: "pointer",
          }}
        >
          <img
            src={nowHoverImage}
            width="300px"
            height="auto"
            onMouseEnter={handleHoverIn}
            onMouseOut={handleHoverOut}
          />
        </Box>
      ) : (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            mb: "5%",
          }}
        >
          <img
            src={nowImage}
            width="300px"
            height="auto"
            onMouseEnter={handleHoverIn}
            onMouseOut={handleHoverOut}
          />
        </Box>
      )}
    </Box>
  );
}
