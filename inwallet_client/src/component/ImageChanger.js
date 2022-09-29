import React, { useState } from "react";

// mui
import { Box } from "@mui/material";

// recoil
import { useRecoilValue } from "recoil";
import { chainState } from "../recoil/chain";

// ETH image
import ethereum from "../image/ETH/ethereum.png";
import INethereum from "../image/ETH/IN_ethereum.png";

// BNB image
import binance from "../image/BNB/binance.png";
import INbinance from "../image/BNB/IN_binance.png";

export default function ImageChanger() {
  const [hoverState, setHoverState] = useState(false);
  const nowChain = useRecoilValue(chainState);
  let nowImage = null;
  let nowHoverImage = null;

  // 현재 체인상태에 따라 출력 변경
  if (nowChain.SelectChain === "ETH") {
    nowImage = ethereum;
    nowHoverImage = INethereum;
  } else if (nowChain.SelectChain === "BNB") {
    nowImage = binance;
    nowHoverImage = INbinance;
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
            alt="nowHoverImage"
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
            alt="nowImage"
          />
        </Box>
      )}
    </Box>
  );
}
