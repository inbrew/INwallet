import React from "react";

// MUI css
import {
  Box,
  Typography,
  Grid,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
} from "@mui/material";

// IMG
import binance from "../image/mainBinance.png";
import ethereum from "../image/mainEthereum.png";
import klaytn from "../image/mainKlaytn.png";

function generate(element) {
  return [0, 1, 2].map((value) =>
    React.cloneElement(element, {
      key: value,
    })
  );
}

export default function Main() {
  const [dense, setDense] = React.useState(false);
  const [secondary, setSecondary] = React.useState(false);
  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              flexDirection: "column",
              border: 5,
              width: 400,
              padding: "5%",
              borderRadius: "3%",
            }}
          >
            <Box sx={{ display: "flex", justifyContent: "center" }}>
              <Typography variant="subtitle1" sx={{ fontFamily: "Times" }}>
                IN wallet의 다양한 체인 안(IN)에서 거래하세요!
              </Typography>
            </Box>
            <Box sx={{ display: "flex", justifyContent: "center" }}>
              <Box sx={{ width: 300 }}>
                <Typography sx={{ mt: 3 }} variant="h6" component="div">
                  접속 가능한 체인
                </Typography>
                <List>
                  <ListItem>
                    <ListItemIcon>
                      <img
                        src={binance}
                        width="auto"
                        height="30px"
                        alt="binance"
                      />
                    </ListItemIcon>
                    <ListItemText primary="Binance - Smartchain(test)" />
                  </ListItem>
                  <Divider />
                  <ListItem>
                    <ListItemIcon>
                      <img
                        src={ethereum}
                        width="auto"
                        height="30px"
                        alt="ethereum"
                      />
                    </ListItemIcon>
                    <ListItemText primary="Ethereum - Goerli" />
                  </ListItem>
                  <Divider />
                  <ListItem>
                    <ListItemIcon>
                      <img
                        src={klaytn}
                        width="auto"
                        height="30px"
                        alt="klaytn"
                      />
                    </ListItemIcon>
                    <ListItemText primary="Klaytn - Baobab" />
                  </ListItem>
                </List>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
