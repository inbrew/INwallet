const {
  address,
  privateKey,
  polygonTestNetRpcURL,
} = require("./data/util/env-config");
const Web3 = require("web3");

const setting = () => {
  console.log(address, privateKey, polygonTestNetRpcURL);
};

setting();
