const {
  address,
  privateKey,
  polygonTestNetRpcURL,
} = require("./data/env-config");
const Web3 = require("web3");

const setting = () => {
  console.log(address, privateKey, polygonTestNetRpcURL);
};

setting();
